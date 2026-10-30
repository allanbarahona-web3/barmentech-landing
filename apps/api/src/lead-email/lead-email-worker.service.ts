import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { EmailDeliveryStatus, LeadEmailTaskStatus, LeadEmailTaskType, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { PrismaService } from "../prisma/prisma.service";
import type { LeadNotificationRecord } from "./lead-notifications.service";
import { getLeadEmailWorkerConfiguration } from "./lead-email-worker.configuration";
import { LeadEmailTaskDeliveryService } from "./lead-email-task-delivery.service";

type ClaimedTask = { id: string; lead_id: string; type: LeadEmailTaskType; attempts: number; lease_token: string };

@Injectable()
export class LeadEmailWorkerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(LeadEmailWorkerService.name);
  private readonly configuration = getLeadEmailWorkerConfiguration();
  private timer: NodeJS.Timeout | undefined;
  private polling = false;
  private stopping = false;
  private stoppingPromise: Promise<boolean> | undefined;

  constructor(private readonly prisma: PrismaService, private readonly delivery: LeadEmailTaskDeliveryService) {}

  onModuleInit(): void { this.schedule(0); }

  async onModuleDestroy(): Promise<void> {
    await this.stop();
  }

  async stop(): Promise<boolean> {
    this.stoppingPromise ??= this.stopPolling();
    return this.stoppingPromise;
  }

  private async stopPolling(): Promise<boolean> {
    this.stopping = true;
    if (this.timer) clearTimeout(this.timer);
    const deadline = Date.now() + this.configuration.shutdownTimeoutMs;
    while (this.polling && Date.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 25));
    return !this.polling;
  }

  async runOnce(): Promise<boolean> {
    const task = await this.claim();
    if (!task) return false;
    const startedAt = Date.now();
    const record = await this.prisma.leadEmailTask.findUnique({
      where: { id: task.id },
      include: { lead: true },
    });
    if (!record) return false;
    if (task.type === LeadEmailTaskType.VISITOR_CONFIRMATION && await this.recipientLimitReached(record.lead.email, task.id)) {
      await this.retry(task, "RECIPIENT_CONFIRMATION_RATE_LIMITED", startedAt);
      return true;
    }
    const result = await this.withTimeout(
      this.delivery.send(record.lead as LeadNotificationRecord, task.type, `lead-email/${task.id}`),
      this.configuration.sendTimeoutMs,
    );
    if (result.accepted) {
      await this.complete(task, startedAt);
    } else {
      await this.retry(task, result.category, startedAt);
    }
    return true;
  }

  private schedule(delay: number): void {
    if (this.stopping) return;
    this.timer = setTimeout(() => { void this.poll(); }, delay);
  }

  private async poll(): Promise<void> {
    if (this.polling || this.stopping) return;
    this.polling = true;
    try { while (!this.stopping && await this.runOnce()) { /* drain available work */ } }
    catch { this.logger.error(JSON.stringify({ event: "lead_email_worker_poll_failed" })); }
    finally { this.polling = false; this.schedule(this.configuration.pollIntervalMs); }
  }

  private async claim(): Promise<ClaimedTask | undefined> {
    const token = randomUUID();
    const rows = await this.prisma.$queryRaw<ClaimedTask[]>(Prisma.sql`
      WITH candidate AS (
        SELECT id FROM lead_email_tasks
        WHERE (status = 'PENDING' AND available_at <= NOW())
           OR (status = 'PROCESSING' AND lease_expires_at <= NOW())
        ORDER BY available_at, created_at
        FOR UPDATE SKIP LOCKED
        LIMIT 1
      )
      UPDATE lead_email_tasks AS task
      SET status = 'PROCESSING', attempts = task.attempts + 1, leased_at = NOW(),
          lease_expires_at = NOW() + (${this.configuration.leaseSeconds} * INTERVAL '1 second'),
          lease_token = ${token}::uuid, updated_at = NOW()
      FROM candidate WHERE task.id = candidate.id
      RETURNING task.id, task.lead_id, task.type, task.attempts, task.lease_token
    `);
    return rows[0];
  }

  private async complete(task: ClaimedTask, startedAt: number): Promise<void> {
    const updated = await this.prisma.leadEmailTask.updateMany({
      where: { id: task.id, leaseToken: task.lease_token, status: LeadEmailTaskStatus.PROCESSING },
      data: { status: LeadEmailTaskStatus.SENT, completedAt: new Date(), leaseToken: null, leaseExpiresAt: null, lastErrorCode: null },
    });
    if (!updated.count) return;
    await this.updateLeadStatus(task.lead_id, task.type, EmailDeliveryStatus.SENT);
    this.logger.log(JSON.stringify({ event: "lead_email_task_sent", taskId: task.id, durationMs: Date.now() - startedAt }));
  }

  private async retry(task: ClaimedTask, category: string, startedAt: number): Promise<void> {
    const final = task.attempts >= this.configuration.maxAttempts || category === "RECIPIENT_CONFIRMATION_RATE_LIMITED";
    const delayMs = Math.min(300_000, 1_000 * 2 ** Math.min(task.attempts, 8));
    const updated = await this.prisma.leadEmailTask.updateMany({
      where: { id: task.id, leaseToken: task.lease_token, status: LeadEmailTaskStatus.PROCESSING },
      data: final
        ? { status: LeadEmailTaskStatus.FAILED, completedAt: new Date(), leaseToken: null, leaseExpiresAt: null, lastErrorCode: category }
        : { status: LeadEmailTaskStatus.PENDING, availableAt: new Date(Date.now() + delayMs), leaseToken: null, leaseExpiresAt: null, lastErrorCode: category },
    });
    if (!updated.count) return;
    if (final) await this.updateLeadStatus(task.lead_id, task.type, EmailDeliveryStatus.FAILED);
    this.logger.warn(JSON.stringify({ event: final ? "lead_email_task_failed" : "lead_email_task_retry", taskId: task.id, attempts: task.attempts, durationMs: Date.now() - startedAt, category }));
  }

  private async updateLeadStatus(leadId: string, type: LeadEmailTaskType, status: EmailDeliveryStatus): Promise<void> {
    await this.prisma.lead.update({ where: { id: leadId }, data: type === LeadEmailTaskType.INTERNAL_NOTIFICATION ? { internalNotificationStatus: status } : { visitorConfirmationStatus: status } });
  }

  private async recipientLimitReached(email: string, taskId: string): Promise<boolean> {
    const now = new Date();
    const sent = await this.prisma.leadEmailTask.count({
      where: {
        type: LeadEmailTaskType.VISITOR_CONFIRMATION,
        id: { not: taskId },
        lead: { email },
        OR: [
          { status: LeadEmailTaskStatus.SENT, completedAt: { gte: new Date(now.getTime() - this.configuration.visitorConfirmationWindowSeconds * 1_000) } },
          { status: LeadEmailTaskStatus.PROCESSING, leaseExpiresAt: { gt: now } },
        ],
      },
    });
    return sent >= this.configuration.visitorConfirmationMaxPerRecipient;
  }

  private async withTimeout<T>(work: Promise<T>, timeoutMs: number): Promise<T | { accepted: false; category: "EMAIL_PROVIDER_REJECTED" }> {
    let timeout: NodeJS.Timeout | undefined;
    try { return await Promise.race([work, new Promise<{ accepted: false; category: "EMAIL_PROVIDER_REJECTED" }>((resolve) => { timeout = setTimeout(() => resolve({ accepted: false, category: "EMAIL_PROVIDER_REJECTED" }), timeoutMs); })]); }
    finally { if (timeout) clearTimeout(timeout); }
  }
}

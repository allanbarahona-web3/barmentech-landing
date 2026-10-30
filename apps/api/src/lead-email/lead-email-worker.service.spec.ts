import { strict as assert } from "node:assert";
import { test } from "node:test";

import { EmailDeliveryStatus, LeadEmailTaskStatus, LeadEmailTaskType } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { LeadEmailTaskDeliveryService } from "./lead-email-task-delivery.service";
import { LeadEmailWorkerService } from "./lead-email-worker.service";

type Claim = { id: string; lead_id: string; type: LeadEmailTaskType; attempts: number; lease_token: string };

const lead = {
  id: "lead-1", sourceSite: "FORMATION", locale: "EN", interest: "COMPANY_FORMATION",
  fullName: "Ada", email: "ada@example.test", phone: null, country: "Costa Rica", company: null,
  message: "A sufficiently long message.", privacyConsentAt: new Date(), campaign: null,
  utmSource: null, utmMedium: null, utmCampaign: null, createdAt: new Date(),
};

function harness(claims: Claim[], outcomes: Array<{ accepted: boolean; category?: "EMAIL_PROVIDER_REJECTED" } | Promise<{ accepted: boolean; category?: "EMAIL_PROVIDER_REJECTED" }>>, updateCounts: number[] = []) {
  const taskUpdates: Array<Record<string, unknown>> = [];
  const leadUpdates: Array<Record<string, unknown>> = [];
  const idempotencyKeys: string[] = [];
  const prisma = {
    $queryRaw: async () => { const next = claims.shift(); return next ? [next] : []; },
    leadEmailTask: {
      findUnique: async (args: { where: { id: string } }) => ({ id: args.where.id, lead }),
      count: async () => 0,
      updateMany: async (args: { data: Record<string, unknown> }) => { taskUpdates.push(args.data); return { count: updateCounts.shift() ?? 1 }; },
    },
    lead: { update: async (args: { data: Record<string, unknown> }) => { leadUpdates.push(args.data); return {}; } },
  } as unknown as PrismaService;
  const delivery = { send: async (_lead: unknown, _type: unknown, key: string) => {
    idempotencyKeys.push(key); const outcome = outcomes.shift() ?? { accepted: true };
    return outcome instanceof Promise ? outcome : outcome.accepted ? { accepted: true as const } : { accepted: false as const, category: outcome.category ?? "EMAIL_PROVIDER_REJECTED" };
  } } as unknown as LeadEmailTaskDeliveryService;
  const worker = new LeadEmailWorkerService(prisma, delivery);
  (worker as unknown as { configuration: Record<string, number> }).configuration = { leaseSeconds: 60, maxAttempts: 3, pollIntervalMs: 1_000, sendTimeoutMs: 10, shutdownTimeoutMs: 20, visitorConfirmationMaxPerRecipient: 3, visitorConfirmationWindowSeconds: 86_400 };
  return { worker, taskUpdates, leadUpdates, idempotencyKeys };
}

function claim(id: string, type: LeadEmailTaskType, attempts = 1): Claim {
  return { id, lead_id: "lead-1", type, attempts, lease_token: `00000000-0000-4000-8000-${id.padStart(12, "0")}` };
}

test("simulated concurrent workers claim a task only once while its lease is valid", async () => {
  let release!: (value: { accepted: boolean }) => void;
  const pending = new Promise<{ accepted: boolean }>((resolve) => { release = resolve; });
  const shared = harness([claim("1", LeadEmailTaskType.INTERNAL_NOTIFICATION)], [pending]);
  const first = shared.worker.runOnce();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(await shared.worker.runOnce(), false);
  release({ accepted: true });
  assert.equal(await first, true);
  assert.equal(shared.idempotencyKeys.length, 1);
});

test("simulated expired leases are eligible for recovery and use a new lease token", async () => {
  const shared = harness([claim("2", LeadEmailTaskType.VISITOR_CONFIRMATION, 2)], [{ accepted: true }]);
  assert.equal(await shared.worker.runOnce(), true);
  assert.equal(shared.leadUpdates[0]?.visitorConfirmationStatus, EmailDeliveryStatus.SENT);
});

test("retries with backoff and marks a task failed at the configured attempt limit", async () => {
  const shared = harness([
    claim("3", LeadEmailTaskType.INTERNAL_NOTIFICATION, 1),
    claim("4", LeadEmailTaskType.VISITOR_CONFIRMATION, 3),
  ], [{ accepted: false }, { accepted: false }]);
  await shared.worker.runOnce();
  await shared.worker.runOnce();
  assert.equal(shared.taskUpdates[0]?.status, LeadEmailTaskStatus.PENDING);
  assert.ok(shared.taskUpdates[0]?.availableAt instanceof Date);
  assert.equal(shared.taskUpdates[1]?.status, LeadEmailTaskStatus.FAILED);
  assert.equal(shared.leadUpdates[0]?.visitorConfirmationStatus, EmailDeliveryStatus.FAILED);
});

test("internal and visitor tasks complete independently and do not repeat a completed task", async () => {
  const shared = harness([
    claim("5", LeadEmailTaskType.INTERNAL_NOTIFICATION),
    claim("6", LeadEmailTaskType.VISITOR_CONFIRMATION),
  ], [{ accepted: true }, { accepted: false }]);
  await shared.worker.runOnce();
  await shared.worker.runOnce();
  assert.equal(shared.leadUpdates[0]?.internalNotificationStatus, EmailDeliveryStatus.SENT);
  assert.equal(shared.leadUpdates.length, 1);
  assert.equal(await shared.worker.runOnce(), false);
});

test("a timed out provider result is retried and a stale lease cannot overwrite a later claim", async () => {
  const never = new Promise<{ accepted: boolean }>(() => undefined);
  const shared = harness([claim("7", LeadEmailTaskType.INTERNAL_NOTIFICATION)], [never], [0]);
  assert.equal(await shared.worker.runOnce(), true);
  assert.equal(shared.taskUpdates.length, 1);
  assert.equal(shared.leadUpdates.length, 0);
});

test("provider acceptance interrupted before persistence is retried with the same provider idempotency key", async () => {
  const shared = harness([
    claim("8", LeadEmailTaskType.INTERNAL_NOTIFICATION),
    claim("8", LeadEmailTaskType.INTERNAL_NOTIFICATION, 2),
  ], [{ accepted: true }, { accepted: true }], [0, 1]);
  await shared.worker.runOnce();
  await shared.worker.runOnce();
  assert.deepEqual(shared.idempotencyKeys, ["lead-email/8", "lead-email/8"]);
});

test("shutdown stops scheduling after an idle worker", async () => {
  const shared = harness([], []);
  shared.worker.onModuleInit();
  assert.equal(await shared.worker.stop(), true);
  await shared.worker.onModuleDestroy();
  assert.equal(await shared.worker.runOnce(), false);
});

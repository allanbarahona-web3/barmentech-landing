import { strict as assert } from "node:assert";
import { test } from "node:test";
import { EmailDeliveryStatus, LeadLocale, PrivacyRequestStatus, PrivacyRequestType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PrivacyRequestNotificationsService } from "./privacy-request-notifications.service";
import { PrivacyRequestRateLimiterService } from "./privacy-request-rate-limiter.service";
import { PrivacyRequestsService } from "./privacy-requests.service";

const input = { email: "visitor@example.com", requestType: PrivacyRequestType.DELETION, locale: LeadLocale.EN, privacyAccepted: true };
test("persists one privacy request and notifies after persistence", async () => {
  const calls: unknown[] = []; let notified = 0;
  const prisma = { privacyRequest: { create: async (args: unknown) => { calls.push(args); return { id: "request-1", ...((args as { data: object }).data) }; } } } as unknown as PrismaService;
  const service = new PrivacyRequestsService(prisma, { notify: async () => { notified += 1; } } as never);
  assert.deepEqual(await service.submit(input), { success: true, requestId: null });
  assert.equal(calls.length, 1); assert.equal(notified, 1);
  const data = (calls[0] as { data: Record<string, unknown> }).data;
  assert.equal(data.status, PrivacyRequestStatus.RECEIVED); assert.equal(data.internalNotificationStatus, EmailDeliveryStatus.PENDING);
});
test("does not persist or notify a honeypot request", async () => {
  let create = 0; const service = new PrivacyRequestsService({ privacyRequest: { create: async () => { create += 1; return {}; } } } as unknown as PrismaService, { notify: async () => { throw new Error("must not notify"); } } as never);
  assert.deepEqual(await service.submit({ ...input, website: "bot" }), { success: true, requestId: null }); assert.equal(create, 0);
});
test("limits repeated privacy requests by framework-provided client address", () => {
  const limiter = new PrivacyRequestRateLimiterService();
  assert.equal(limiter.consume("127.0.0.1", 0).allowed, true);
  assert.equal(limiter.consume("127.0.0.1", 1).allowed, true);
  assert.equal(limiter.consume("127.0.0.1", 2).allowed, true);
  const denied = limiter.consume("127.0.0.1", 3);
  assert.equal(denied.allowed, false); assert.ok(denied.retryAfterSeconds > 0);
});
test("bounds the number of active privacy-request rate-limit keys", () => {
  const limiter = new PrivacyRequestRateLimiterService();
  for (let index = 0; index < 10_000; index += 1) {
    assert.equal(limiter.consume(`198.51.100.${index}`, 0).allowed, true);
  }
  assert.deepEqual(limiter.consume("203.0.113.1", 0), {
    allowed: false,
    retryAfterSeconds: 60,
  });
});
test("keeps the public error safe when persistence fails", async () => {
  const service = new PrivacyRequestsService({ privacyRequest: { create: async () => { throw new Error("database details"); } } } as unknown as PrismaService, { notify: async () => undefined } as never);
  await assert.rejects(service.submit(input), { status: 500, message: "Unable to process your request." });
});
test("localizes both privacy emails and records independent delivery results", async () => {
  const messages: Array<{ subject: string; html: string; replyTo?: string; attachments?: unknown[] }> = [];
  const updates: Array<Record<string, unknown>> = [];
  const request = {
    id: "request-1", locale: LeadLocale.ES, requestType: PrivacyRequestType.DELETION,
    status: PrivacyRequestStatus.RECEIVED, email: "visitor@example.com", message: "Necesito ayuda",
    privacyNoticeAcceptedAt: new Date(), internalNotificationStatus: EmailDeliveryStatus.PENDING,
    visitorConfirmationStatus: EmailDeliveryStatus.PENDING, createdAt: new Date(), updatedAt: new Date(),
  } as never;
  const prisma = { privacyRequest: { update: async ({ data }: { data: Record<string, unknown> }) => { updates.push(data); return request; } } } as unknown as PrismaService;
  const delivery = { send: async (message: { subject: string; html: string; replyTo?: string; attachments?: unknown[] }) => { messages.push(message); return messages.length === 1 ? { accepted: true as const } : { accepted: false as const, category: "EMAIL_PROVIDER_REJECTED" as const }; } };
  const service = new PrivacyRequestNotificationsService(prisma, delivery, { apiKey: "mock-key", fromEmail: "notices@example.com", notificationTo: "leads@example.com" });
  await service.notify(request);
  assert.equal(messages.length, 2); assert.match(messages[0].subject, /Nueva solicitud de privacidad/); assert.match(messages[1].subject, /Recibimos tu solicitud de privacidad/);
  assert.equal(messages[0].replyTo, "visitor@example.com"); assert.match(messages[0].html, /identidad de la persona debe verificarse/); assert.match(messages[1].html, /Tipo solicitado/); assert.match(messages[1].html, /Eliminación de información/); assert.match(messages[1].html, /no significa que la acción solicitada ya se haya completado/); assert.match(messages[1].html, /No respondas con documentos de identidad/); assert.match(messages[1].html, /conservación de registros/); assert.doesNotMatch(messages[1].html, /WITHDRAW_CONSENT/);
  assert.equal(updates[0].internalNotificationStatus, EmailDeliveryStatus.SENT); assert.equal(updates[1].visitorConfirmationStatus, EmailDeliveryStatus.FAILED);
});

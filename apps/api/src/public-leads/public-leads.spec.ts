import { strict as assert } from "node:assert";
import { test } from "node:test";

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { HTTP_CODE_METADATA } from "@nestjs/common/constants";
import {
  EmailDeliveryStatus,
  LeadInterest,
  LeadLocale,
  LeadSourceSite,
  LeadStatus,
} from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";
import { LeadNotificationsService } from "../lead-email/lead-notifications.service";
import { CreatePublicLeadDto } from "./dto/create-public-lead.dto";
import { PublicLeadRateLimiterService } from "./public-lead-rate-limiter.service";
import { PublicLeadsController } from "./public-leads.controller";
import { PublicLeadsService } from "./public-leads.service";

const validationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});

function validPayload(): Record<string, unknown> {
  return {
    fullName: "  Ada Lovelace  ",
    email: "  ADA@EXAMPLE.COM  ",
    phone: " +1 555 0100 ",
    country: "  Costa Rica ",
    company: "  Analytical Engines ",
    interest: LeadInterest.COMPANY_FORMATION,
    message: "  I need help forming a company.  ",
    locale: LeadLocale.EN,
    sourceSite: LeadSourceSite.FORMATION,
    campaign: "  autumn-launch ",
    privacyAccepted: true,
  };
}

async function validateLead(
  payload: Record<string, unknown>,
): Promise<CreatePublicLeadDto> {
  return validationPipe.transform(payload, {
    type: "body",
    metatype: CreatePublicLeadDto,
  }) as Promise<CreatePublicLeadDto>;
}

function createPrismaMock(options?: { createError?: Error }) {
  const createCalls: Array<{ data: Record<string, unknown> }> = [];
  const prisma = {
    lead: {
      create: async (arguments_: { data: Record<string, unknown> }) => {
        createCalls.push(arguments_);
        if (options?.createError) {
          throw options.createError;
        }
        return { id: "lead-123" };
      },
    },
  } as unknown as PrismaService;

  return { createCalls, prisma };
}

function createResponseMock() {
  return {
    setHeader: () => undefined,
  };
}

function createNotificationsMock(): LeadNotificationsService {
  return {
    notify: async () => undefined,
  } as unknown as LeadNotificationsService;
}

test("normalizes and persists a valid lead with an explicit created response", async () => {
  const { createCalls, prisma } = createPrismaMock();
  const service = new PublicLeadsService(prisma, createNotificationsMock());
  const controller = new PublicLeadsController(
    service,
    new PublicLeadRateLimiterService(),
  );
  const lead = await validateLead(validPayload());

  const result = await controller.create(
    lead,
    { ip: "127.0.0.1" },
    createResponseMock(),
  );

  assert.deepEqual(result, { success: true, leadId: null });
  assert.equal(
    Reflect.getMetadata(HTTP_CODE_METADATA, PublicLeadsController.prototype.create),
    HttpStatus.CREATED,
  );
  assert.equal(createCalls.length, 1);
  const persisted = createCalls[0]?.data;
  assert.equal(persisted?.fullName, "Ada Lovelace");
  assert.equal(persisted?.email, "ada@example.com");
  assert.equal(persisted?.phone, "+1 555 0100");
  assert.equal(persisted?.country, "Costa Rica");
  assert.equal(persisted?.company, "Analytical Engines");
  assert.equal(persisted?.message, "I need help forming a company.");
  assert.equal(persisted?.campaign, "autumn-launch");
  assert.equal(persisted?.status, LeadStatus.NEW);
  assert.equal(
    persisted?.internalNotificationStatus,
    EmailDeliveryStatus.PENDING,
  );
  assert.equal(
    persisted?.visitorConfirmationStatus,
    EmailDeliveryStatus.PENDING,
  );
  assert.ok(persisted?.privacyConsentAt instanceof Date);
});

test("maps optional empty strings to null database fields", async () => {
  const { createCalls, prisma } = createPrismaMock();
  const service = new PublicLeadsService(prisma, createNotificationsMock());
  const lead = await validateLead({
    ...validPayload(),
    phone: "   ",
    company: "   ",
    campaign: "   ",
  });

  await service.submit(lead);

  assert.equal(createCalls[0]?.data.phone, null);
  assert.equal(createCalls[0]?.data.company, null);
  assert.equal(createCalls[0]?.data.campaign, null);
});

test("rejects invalid data through the application validation configuration", async () => {
  const cases: Array<[string, Record<string, unknown>]> = [
    ["invalid email", { ...validPayload(), email: "not-an-email" }],
    ["unknown field", { ...validPayload(), status: "NEW" }],
    ["invalid interest", { ...validPayload(), interest: "NOT_A_LEAD_INTEREST" }],
    ["invalid locale", { ...validPayload(), locale: "fr" }],
    ["invalid source site", { ...validPayload(), sourceSite: "OTHER" }],
    ["privacy not accepted", { ...validPayload(), privacyAccepted: false }],
    ["blank required value", { ...validPayload(), country: "   " }],
    ["excessive full name", { ...validPayload(), fullName: "a".repeat(161) }],
    ["excessive message", { ...validPayload(), message: "a".repeat(2_001) }],
    ["too short message", { ...validPayload(), message: "Too short" }],
  ];

  for (const [name, payload] of cases) {
    await assert.rejects(
      () => validateLead(payload),
      (error: unknown) => error instanceof BadRequestException,
      name,
    );
  }
});

test("returns a success-shaped response for a populated honeypot without persisting", async () => {
  const { createCalls, prisma } = createPrismaMock();
  const service = new PublicLeadsService(prisma, createNotificationsMock());
  const lead = await validateLead({
    ...validPayload(),
    website: " https://bot.example ",
  });

  const result = await service.submit(lead);

  assert.deepEqual(result, { success: true, leadId: null });
  assert.equal(createCalls.length, 0);
});

test("limits a client IP after five accepted lead attempts", async () => {
  const { prisma } = createPrismaMock();
  const controller = new PublicLeadsController(
    new PublicLeadsService(prisma, createNotificationsMock()),
    new PublicLeadRateLimiterService(),
  );
  const request = { ip: "192.0.2.10" };
  const responseHeaders = new Map<string, string>();
  const response = {
    setHeader: (name: string, value: string) => responseHeaders.set(name, value),
  };

  for (let attempt = 0; attempt < 5; attempt += 1) {
    await controller.create(await validateLead(validPayload()), request, response);
  }

  await assert.rejects(
    async () =>
      controller.create(await validateLead(validPayload()), request, response),
    (error: unknown) => {
      assert.ok(error instanceof HttpException);
      assert.equal(error.getStatus(), HttpStatus.TOO_MANY_REQUESTS);
      assert.deepEqual(error.getResponse(), {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        error: "Too many requests. Please try again later.",
      });
      return true;
    },
  );
  assert.ok(Number(responseHeaders.get("Retry-After")) > 0);
});

test("bounds the number of active lead rate-limit keys", () => {
  const limiter = new PublicLeadRateLimiterService();
  for (let index = 0; index < 10_000; index += 1) {
    assert.equal(limiter.consume(`198.51.100.${index}`, 0).allowed, true);
  }

  assert.deepEqual(limiter.consume("203.0.113.1", 0), {
    allowed: false,
    retryAfterSeconds: 60,
  });
});

test("returns a generic error when Prisma persistence fails", async () => {
  const { prisma } = createPrismaMock({
    createError: new Error("database connection failure"),
  });
  const service = new PublicLeadsService(prisma, createNotificationsMock());

  await assert.rejects(
    async () => service.submit(await validateLead(validPayload())),
    (error: unknown) => {
      assert.ok(error instanceof HttpException);
      assert.equal(error.getStatus(), HttpStatus.INTERNAL_SERVER_ERROR);
      assert.doesNotMatch(
        JSON.stringify(error.getResponse()),
        /database|connection/i,
      );
      return true;
    },
  );
});

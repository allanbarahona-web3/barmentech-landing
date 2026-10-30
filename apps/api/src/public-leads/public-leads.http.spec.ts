import { strict as assert } from "node:assert";
import { randomUUID } from "node:crypto";
import { test } from "node:test";

import { Module, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { PublicExceptionFilter } from "../http/public-exception.filter";
import { PrismaService } from "../prisma/prisma.service";
import { PublicLeadRateLimiterService } from "./public-lead-rate-limiter.service";
import { PublicLeadsController } from "./public-leads.controller";
import { PublicLeadsService } from "./public-leads.service";

function createPrismaHarness() {
  const submissions = new Map<string, { contentHash: string }>();
  let creates = 0;
  const prisma = {
    leadSubmission: {
      findUnique: async ({ where }: { where: { idempotencyKey: string } }) =>
        submissions.get(where.idempotencyKey) ?? null,
    },
    $transaction: async (callback: (transaction: { leadSubmission: { create(args: { data: { contentHash: string; idempotencyKey: string } }): Promise<unknown> } }) => Promise<unknown>) =>
      callback({
        leadSubmission: {
          create: async ({ data }) => {
            creates += 1;
            submissions.set(data.idempotencyKey, {
              contentHash: data.contentHash,
            });
            return {};
          },
        },
      }),
  } as unknown as PrismaService;

  return {
    creates: () => creates,
    prisma,
  };
}

function createModule(prisma: PrismaService) {
  @Module({
    controllers: [PublicLeadsController],
    providers: [
      PublicLeadsService,
      PublicLeadRateLimiterService,
      { provide: PrismaService, useValue: prisma },
    ],
  })
  class PublicLeadsHttpTestModule {}

  return PublicLeadsHttpTestModule;
}

const formationPayload = {
  fullName: "Test Visitor",
  email: "test.visitor@example.test",
  country: "Costa Rica",
  interest: "COMPANY_FORMATION",
  locale: "EN",
  message: "I need help forming a company.",
  privacyAccepted: true,
  sourceSite: "FORMATION",
  website: "",
};

test("accepts the Formation payload with Idempotency-Key and replays it without another write", async () => {
  const harness = createPrismaHarness();
  const app = await NestFactory.create(createModule(harness.prisma), {
    logger: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new PublicExceptionFilter());

  try {
    await app.listen(0, "127.0.0.1");
    const address = app.getHttpServer().address();
    assert.ok(address && typeof address !== "string");
    const endpoint = `http://127.0.0.1:${address.port}/public/leads`;
    const body = JSON.stringify(formationPayload);

    const missingKey = await fetch(endpoint, {
      body,
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    assert.equal(missingKey.status, 400);
    assert.deepEqual(await missingKey.json(), {
      message: "Invalid request.",
      statusCode: 400,
    });

    const idempotencyKey = randomUUID();
    const request = {
      body,
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      method: "POST",
    };
    const first = await fetch(endpoint, request);
    assert.equal(first.status, 201);
    assert.deepEqual(await first.json(), { success: true, leadId: null });

    const replay = await fetch(endpoint, request);
    assert.equal(replay.status, 201);
    assert.deepEqual(await replay.json(), { success: true, leadId: null });
    assert.equal(harness.creates(), 1);
  } finally {
    await app.close();
  }
});

import { strict as assert } from "node:assert";
import { test } from "node:test";

import { NestFactory } from "@nestjs/core";

import {
  EMAIL_DELIVERY_SERVICE,
  ResendEmailDeliveryService,
} from "../lead-email/email-delivery.service";
import { LEAD_EMAIL_CONFIGURATION } from "../lead-email/lead-email-configuration";
import { PrismaService } from "../prisma/prisma.service";
import { PrivacyRequestNotificationsService } from "./privacy-request-notifications.service";
import { PrivacyRequestsModule } from "./privacy-requests.module";

test("resolves privacy notification dependencies through LeadEmailModule", async () => {
  const originalConnect = PrismaService.prototype.$connect;
  const originalDisconnect = PrismaService.prototype.$disconnect;
  const originalSend = ResendEmailDeliveryService.prototype.send;

  Object.defineProperty(PrismaService.prototype, "$connect", {
    configurable: true,
    value: async () => undefined,
  });
  Object.defineProperty(PrismaService.prototype, "$disconnect", {
    configurable: true,
    value: async () => undefined,
  });
  Object.defineProperty(ResendEmailDeliveryService.prototype, "send", {
    configurable: true,
    value: async () => ({ accepted: true as const }),
  });

  let app: Awaited<ReturnType<typeof NestFactory.createApplicationContext>> | undefined;
  try {
    const context = await NestFactory.createApplicationContext(PrivacyRequestsModule, {
      logger: false,
    });
    app = context;

    assert.ok(context.get(PrivacyRequestNotificationsService));
    assert.ok(context.get(EMAIL_DELIVERY_SERVICE));
    assert.doesNotThrow(() => context.get(LEAD_EMAIL_CONFIGURATION));
  } finally {
    await app?.close();
    Object.defineProperty(PrismaService.prototype, "$connect", {
      configurable: true,
      value: originalConnect,
    });
    Object.defineProperty(PrismaService.prototype, "$disconnect", {
      configurable: true,
      value: originalDisconnect,
    });
    Object.defineProperty(ResendEmailDeliveryService.prototype, "send", {
      configurable: true,
      value: originalSend,
    });
  }
});

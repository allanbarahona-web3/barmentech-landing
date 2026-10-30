import { strict as assert } from "node:assert";
import { test } from "node:test";

import { NestFactory } from "@nestjs/core";

import { PrismaService } from "../prisma/prisma.service";
import { PublicLeadsModule } from "./public-leads.module";
import { PublicLeadsService } from "./public-leads.service";

test("resolves PublicLeadsService through the Nest container without a database connection", async () => {
  const originalConnect = PrismaService.prototype.$connect;
  const originalDisconnect = PrismaService.prototype.$disconnect;

  Object.defineProperty(PrismaService.prototype, "$connect", {
    configurable: true,
    value: async () => undefined,
  });
  Object.defineProperty(PrismaService.prototype, "$disconnect", {
    configurable: true,
    value: async () => undefined,
  });

  let context: Awaited<ReturnType<typeof NestFactory.createApplicationContext>> | undefined;
  try {
    context = await NestFactory.createApplicationContext(PublicLeadsModule, {
      logger: false,
    });

    assert.ok(context.get(PublicLeadsService));
  } finally {
    await context?.close();
    Object.defineProperty(PrismaService.prototype, "$connect", {
      configurable: true,
      value: originalConnect,
    });
    Object.defineProperty(PrismaService.prototype, "$disconnect", {
      configurable: true,
      value: originalDisconnect,
    });
  }
});

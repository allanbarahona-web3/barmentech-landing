import { Module } from "@nestjs/common";

import { PrismaModule } from "../prisma/prisma.module";
import { PublicLeadRateLimiterService } from "./public-lead-rate-limiter.service";
import { PublicLeadsController } from "./public-leads.controller";
import { PublicLeadsService } from "./public-leads.service";

@Module({
  imports: [PrismaModule],
  controllers: [PublicLeadsController],
  providers: [PublicLeadsService, PublicLeadRateLimiterService],
})
export class PublicLeadsModule {}

import { Module } from "@nestjs/common";

import { LeadEmailModule } from "../lead-email/lead-email.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PublicLeadRateLimiterService } from "./public-lead-rate-limiter.service";
import { PublicLeadsController } from "./public-leads.controller";
import { PublicLeadsService } from "./public-leads.service";

@Module({
  imports: [PrismaModule, LeadEmailModule],
  controllers: [PublicLeadsController],
  providers: [PublicLeadsService, PublicLeadRateLimiterService],
})
export class PublicLeadsModule {}

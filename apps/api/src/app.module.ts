import { Module } from "@nestjs/common";

import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PublicLeadsModule } from "./public-leads/public-leads.module";
import { PrivacyRequestsModule } from "./privacy-requests/privacy-requests.module";

@Module({
  imports: [HealthModule, PrismaModule, PublicLeadsModule, PrivacyRequestsModule],
})
export class AppModule {}

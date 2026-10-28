import { Module } from "@nestjs/common";
import { LeadEmailModule } from "../lead-email/lead-email.module";
import { PrismaModule } from "../prisma/prisma.module";
import { PrivacyRequestNotificationsService } from "./privacy-request-notifications.service";
import { PrivacyRequestRateLimiterService } from "./privacy-request-rate-limiter.service";
import { PrivacyRequestsController } from "./privacy-requests.controller";
import { PrivacyRequestsService } from "./privacy-requests.service";
@Module({ imports: [PrismaModule, LeadEmailModule], controllers: [PrivacyRequestsController], providers: [PrivacyRequestsService, PrivacyRequestNotificationsService, PrivacyRequestRateLimiterService] })
export class PrivacyRequestsModule {}

import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailDeliveryStatus, PrivacyRequestStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePrivacyRequestDto } from "./dto/create-privacy-request.dto";
import { PrivacyRequestNotificationsService } from "./privacy-request-notifications.service";
@Injectable()
export class PrivacyRequestsService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: PrivacyRequestNotificationsService) {}
  async submit(input: CreatePrivacyRequestDto) {
    if (input.website) return { success: true as const, requestId: null };
    try {
      const request = await this.prisma.privacyRequest.create({ data: { locale: input.locale, requestType: input.requestType, status: PrivacyRequestStatus.RECEIVED, email: input.email, message: input.message ?? null, privacyNoticeAcceptedAt: new Date(), internalNotificationStatus: EmailDeliveryStatus.PENDING, visitorConfirmationStatus: EmailDeliveryStatus.PENDING } });
      try { await this.notifications.notify(request); } catch { /* persisted request remains accepted */ }
      return { success: true as const, requestId: null };
    } catch { throw new InternalServerErrorException("Unable to process your request."); }
  }
}

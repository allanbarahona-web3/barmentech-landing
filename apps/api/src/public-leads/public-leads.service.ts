import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailDeliveryStatus, LeadStatus } from "@prisma/client";

import { LeadNotificationsService } from "../lead-email/lead-notifications.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePublicLeadDto } from "./dto/create-public-lead.dto";

export type PublicLeadSubmissionResponse = {
  success: true;
  leadId: null;
};

@Injectable()
export class PublicLeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly leadNotifications: LeadNotificationsService,
  ) {}

  async submit(
    lead: CreatePublicLeadDto,
  ): Promise<PublicLeadSubmissionResponse> {
    if (lead.website) {
      return { success: true, leadId: null };
    }

    try {
      const createdLead = await this.prisma.lead.create({
        data: {
          sourceSite: lead.sourceSite,
          locale: lead.locale,
          interest: lead.interest,
          status: LeadStatus.NEW,
          fullName: lead.fullName,
          email: lead.email,
          phone: lead.phone ?? null,
          country: lead.country,
          company: lead.company ?? null,
          message: lead.message,
          privacyConsentAt: new Date(),
          campaign: lead.campaign ?? null,
          internalNotificationStatus: EmailDeliveryStatus.PENDING,
          visitorConfirmationStatus: EmailDeliveryStatus.PENDING,
        },
        select: {
          id: true,
          sourceSite: true,
          locale: true,
          interest: true,
          fullName: true,
          email: true,
          phone: true,
          country: true,
          company: true,
          message: true,
          privacyConsentAt: true,
          campaign: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          createdAt: true,
        },
      });

      await this.notifyAfterPersistence(createdLead);

      return { success: true, leadId: null };
    } catch {
      throw new InternalServerErrorException(
        "Unable to process your submission.",
      );
    }
  }

  private async notifyAfterPersistence(
    lead: Parameters<LeadNotificationsService["notify"]>[0],
  ): Promise<void> {
    try {
      await this.leadNotifications.notify(lead);
    } catch {
      // Notifications are best-effort after a successful lead insert.
    }
  }
}

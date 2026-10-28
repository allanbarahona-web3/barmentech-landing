import { Inject, Injectable, Logger } from "@nestjs/common";
import { EmailDeliveryStatus, type PrivacyRequest } from "@prisma/client";

import {
  EMAIL_DELIVERY_SERVICE,
  type EmailDeliveryResult,
  type EmailDeliveryService,
  type TransactionalEmail,
} from "../lead-email/email-delivery.service";
import {
  LEAD_EMAIL_CONFIGURATION,
  type LeadEmailConfiguration,
} from "../lead-email/lead-email-configuration";
import { PrismaService } from "../prisma/prisma.service";
import {
  createInternalPrivacyRequestTemplate,
  createVisitorPrivacyRequestTemplate,
} from "./privacy-request-email-templates";

type DeliveryType = "internal" | "visitor";
type StatusField =
  | "internalNotificationStatus"
  | "visitorConfirmationStatus";
type FailureCategory =
  | "EMAIL_TEMPLATE_FAILED"
  | "EMAIL_PROVIDER_REJECTED"
  | "EMAIL_STATUS_UPDATE_FAILED";

@Injectable()
export class PrivacyRequestNotificationsService {
  private readonly logger = new Logger(PrivacyRequestNotificationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(EMAIL_DELIVERY_SERVICE)
    private readonly delivery: EmailDeliveryService,
    @Inject(LEAD_EMAIL_CONFIGURATION)
    private readonly config: LeadEmailConfiguration | null,
  ) {}

  async notify(request: PrivacyRequest): Promise<void> {
    if (!this.config) {
      await this.record(request.id, "internalNotificationStatus", EmailDeliveryStatus.FAILED, "internal", "EMAIL_PROVIDER_REJECTED");
      await this.record(request.id, "visitorConfirmationStatus", EmailDeliveryStatus.FAILED, "visitor", "EMAIL_PROVIDER_REJECTED");
      return;
    }
    const config = this.config;

    await this.sendTemplate(request, "internal", "internalNotificationStatus", () => ({
      ...createInternalPrivacyRequestTemplate(request),
      from: config.fromEmail,
      to: config.notificationTo,
      replyTo: request.email,
    }));
    await this.sendTemplate(request, "visitor", "visitorConfirmationStatus", () => ({
      ...createVisitorPrivacyRequestTemplate(request),
      from: config.fromEmail,
      to: request.email,
    }));
  }

  private async sendTemplate(
    request: PrivacyRequest,
    deliveryType: DeliveryType,
    field: StatusField,
    createMessage: () => TransactionalEmail,
  ): Promise<void> {
    let message: TransactionalEmail;
    try {
      message = createMessage();
    } catch {
      await this.record(request.id, field, EmailDeliveryStatus.FAILED, deliveryType, "EMAIL_TEMPLATE_FAILED");
      return;
    }

    let result: EmailDeliveryResult;
    try {
      result = await this.delivery.send(message);
    } catch {
      result = { accepted: false, category: "EMAIL_PROVIDER_REJECTED" };
    }

    await this.record(
      request.id,
      field,
      result.accepted ? EmailDeliveryStatus.SENT : EmailDeliveryStatus.FAILED,
      deliveryType,
      result.accepted ? undefined : result.category,
      result.accepted ? undefined : result,
    );
  }

  private async record(
    id: string,
    field: StatusField,
    status: EmailDeliveryStatus,
    deliveryType: DeliveryType,
    category?: FailureCategory,
    provider?: Extract<EmailDeliveryResult, { accepted: false }>,
  ): Promise<void> {
    if (category) this.logFailure(id, deliveryType, category, provider);
    try {
      await this.prisma.privacyRequest.update({
        where: { id },
        data: { [field]: status },
      });
    } catch {
      this.logFailure(id, deliveryType, "EMAIL_STATUS_UPDATE_FAILED");
    }
  }

  private logFailure(
    requestId: string,
    deliveryType: DeliveryType,
    category: FailureCategory,
    provider?: Extract<EmailDeliveryResult, { accepted: false }>,
  ): void {
    this.logger.warn(JSON.stringify({
      requestId,
      deliveryType,
      category,
      ...(provider?.providerStatusCode ? { providerStatusCode: provider.providerStatusCode } : {}),
      ...(provider?.providerErrorName ? { providerErrorName: provider.providerErrorName } : {}),
    }));
  }
}

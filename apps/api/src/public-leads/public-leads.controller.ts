import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";

import { CreatePublicLeadDto } from "./dto/create-public-lead.dto";
import { PublicLeadRateLimiterService } from "./public-lead-rate-limiter.service";
import {
  type PublicLeadSubmissionResponse,
  PublicLeadsService,
} from "./public-leads.service";

type ClientRequest = {
  ip?: string;
};

type HeaderResponse = {
  setHeader(name: string, value: string): unknown;
};

@Controller("public/leads")
export class PublicLeadsController {
  constructor(
    private readonly publicLeadsService: PublicLeadsService,
    private readonly rateLimiter: PublicLeadRateLimiterService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() lead: CreatePublicLeadDto,
    @Req() request: ClientRequest,
    @Res({ passthrough: true }) response: HeaderResponse,
  ): Promise<PublicLeadSubmissionResponse> {
    // Express trusts no proxy headers unless the deployment explicitly sets the
    // restricted TRUST_PROXY=loopback configuration.
    if (lead.website) {
      return this.publicLeadsService.submit(lead);
    }

    const rateLimit = this.rateLimiter.consume(request.ip || "unknown");
    if (!rateLimit.allowed) {
      response.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: "Too many requests. Please try again later.",
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return this.publicLeadsService.submit(lead);
  }
}

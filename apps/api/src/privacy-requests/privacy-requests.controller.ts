import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { CreatePrivacyRequestDto } from "./dto/create-privacy-request.dto";
import { PrivacyRequestRateLimiterService } from "./privacy-request-rate-limiter.service";
import { PrivacyRequestsService } from "./privacy-requests.service";

@Controller("public/privacy-requests")
export class PrivacyRequestsController {
  constructor(private readonly service: PrivacyRequestsService, private readonly limiter: PrivacyRequestRateLimiterService) {}
  @Post() @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreatePrivacyRequestDto, @Req() request: { ip?: string }, @Res({ passthrough: true }) response: { setHeader(name: string, value: string): unknown }) {
    const result = this.limiter.consume(request.ip || "unknown");
    if (!result.allowed) { response.setHeader("Retry-After", String(result.retryAfterSeconds)); throw new HttpException({ statusCode: HttpStatus.TOO_MANY_REQUESTS, error: "Too many requests. Please try again later." }, HttpStatus.TOO_MANY_REQUESTS); }
    return this.service.submit(body);
  }
}

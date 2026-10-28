import { Injectable } from "@nestjs/common";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1_000;
const MAX_TRACKED_CLIENTS = 10_000;
const CAPACITY_RETRY_AFTER_SECONDS = 60;

type RateLimitEntry = {
  attempts: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
};

@Injectable()
export class PublicLeadRateLimiterService {
  private readonly entries = new Map<string, RateLimitEntry>();

  // This in-memory limiter is suitable only for a single local or QA instance.
  // Replace it with centralized storage before horizontally scaled production use.
  consume(clientIp: string, now = Date.now()): RateLimitResult {
    this.removeExpiredEntries(now);

    const entry = this.entries.get(clientIp);
    if (!entry) {
      if (this.entries.size >= MAX_TRACKED_CLIENTS) {
        return {
          allowed: false,
          retryAfterSeconds: CAPACITY_RETRY_AFTER_SECONDS,
        };
      }

      this.entries.set(clientIp, {
        attempts: 1,
        resetAt: now + WINDOW_MS,
      });
      return { allowed: true, retryAfterSeconds: 0 };
    }

    if (entry.attempts >= MAX_ATTEMPTS) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1_000)),
      };
    }

    entry.attempts += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  }

  private removeExpiredEntries(now: number): void {
    for (const [clientIp, entry] of this.entries) {
      if (entry.resetAt <= now) {
        this.entries.delete(clientIp);
      }
    }
  }
}

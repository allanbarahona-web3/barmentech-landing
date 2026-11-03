"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import type { Locale } from "../lib/i18n";
import { buildTechnologyWhatsappUrl } from "../lib/public-settings";
import {
  getPublicLeadEndpoint,
  getPublicLeadLocale,
  getTechnologyLeadTopic,
  isPublicLeadSuccessResponse,
  TECHNOLOGY_LEAD_INTEREST,
  TECHNOLOGY_LEAD_SOURCE_SITE,
} from "../lib/public-lead-contract";
import type { TechnologyContactContent } from "../lib/technology-content";

type TechnologyContactFormProps = {
  apiBaseUrl?: string;
  callRequest?: boolean;
  copy: TechnologyContactContent["form"];
  locale: Locale;
  privacyHref: string;
  whatsappUrl?: string;
};

type SubmissionStatus = "error" | "idle" | "rate-limited" | "submitting" | "success" | "validation-error";

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_MESSAGE_LENGTH = 1_800;
const MIN_MESSAGE_LENGTH = 10;

export function TechnologyContactForm({ apiBaseUrl, callRequest = false, copy, locale, privacyHref, whatsappUrl }: TechnologyContactFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [rateLimitSeconds, setRateLimitSeconds] = useState<number | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const idempotencyRef = useRef<{ key: string; payload: string } | null>(null);
  const endpoint = apiBaseUrl ? getPublicLeadEndpoint(apiBaseUrl) : undefined;

  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  if (status === "success") {
    return (
      <section aria-labelledby="technology-contact-success-title" className="rounded-[var(--bm-radius-panel)] border border-[#c9dcf6] bg-white p-6 shadow-[0_12px_34px_rgb(18_32_51/8%)] sm:p-8" role="status">
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f5ea] text-[#157347]">
          <svg fill="none" height="22" viewBox="0 0 24 24" width="22"><path d="m7.5 12 3 3 6-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /></svg>
        </span>
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)] focus:outline-none" id="technology-contact-success-title" ref={successHeadingRef} tabIndex={-1}>{copy.success.title}</h2>
        <p className="mt-3 text-base leading-7 text-[var(--bm-text-muted)]">{copy.success.body}</p>
        <a className="mt-6 inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={`/${locale}`}>{copy.success.homeLabel}</a>
      </section>
    );
  }

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {};
    const requiredFields = ["full_name", "email", "country", "interest", "message", ...(callRequest ? ["phone"] : [])];

    requiredFields.forEach((field) => {
      if (!String(formData.get(field) ?? "").trim()) {
        nextErrors[field] = copy.requiredField;
      }
    });

    const email = String(formData.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = copy.emailInvalid;
    }

    const message = String(formData.get("message") ?? "").trim();
    if (message && message.length < MIN_MESSAGE_LENGTH) {
      nextErrors.message = copy.messageTooShort;
    }

    if (!formData.get("privacy_consent")) {
      nextErrors.privacy_consent = copy.privacyConsentRequired;
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      const firstInvalid = Object.keys(nextErrors)[0];
      const control = firstInvalid ? form.elements.namedItem(firstInvalid) : null;
      if (control instanceof HTMLElement) {
        control.focus();
      }
      setStatus("idle");
      return;
    }

    if (!endpoint) {
      setStatus("error");
      return;
    }

    const topic = getTechnologyLeadTopic(String(formData.get("interest") ?? ""));
    const selectedTopicLabel = copy.interestOptions.find((option) => option.value === topic)?.label;
    if (!topic || !selectedTopicLabel) {
      setStatus("validation-error");
      return;
    }

    const optionalValue = (field: string) => {
      const value = String(formData.get(field) ?? "").trim();
      return value || undefined;
    };
    const requestBody = {
      fullName: String(formData.get("full_name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: optionalValue("phone"),
      country: String(formData.get("country") ?? "").trim(),
      company: optionalValue("company"),
      interest: TECHNOLOGY_LEAD_INTEREST,
      message: `${copy.interestLabel}: ${selectedTopicLabel}\n\n${String(formData.get("message") ?? "").trim()}`,
      locale: getPublicLeadLocale(locale),
      sourceSite: TECHNOLOGY_LEAD_SOURCE_SITE,
      privacyAccepted: true,
      website: String(formData.get("website") ?? "").trim(),
    };
    const payload = JSON.stringify(requestBody);
    if (!idempotencyRef.current || idempotencyRef.current.payload !== payload) {
      idempotencyRef.current = { key: crypto.randomUUID(), payload };
    }

    setStatus("submitting");
    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(endpoint, {
        body: payload,
        credentials: "omit",
        headers: { Accept: "application/json", "Content-Type": "application/json", "Idempotency-Key": idempotencyRef.current.key },
        method: "POST",
        signal: abortController.signal,
      });

      if (response.status === 201) {
        const responseBody: unknown = await response.json();
        if (!isPublicLeadSuccessResponse(responseBody)) throw new Error("Invalid lead submission response.");
        form.reset();
        idempotencyRef.current = null;
        setErrors({});
        setStatus("success");
        return;
      }

      if (response.status === 400) {
        setStatus("validation-error");
      } else if (response.status === 429) {
        setRateLimitSeconds(getRetryAfterSeconds(response.headers.get("Retry-After")));
        setStatus("rate-limited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  const inputClass = "mt-2 min-h-[var(--bm-control-height)] w-full rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] bg-white px-3 py-2.5 text-base text-[var(--bm-text)] shadow-sm outline-none transition-colors placeholder:text-[var(--bm-text-muted)] focus:border-[var(--bm-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]";
  const fieldError = (field: string) => errors[field] ? `${field}-error` : undefined;
  const fallbackWhatsappUrl = buildTechnologyWhatsappUrl(
    whatsappUrl,
    locale === "en"
      ? "Hello Barmentech, I would like to discuss a Technology project."
      : "Hola Barmentech, me gustaría conversar sobre un proyecto de Tecnología.",
  );

  return (
    <form aria-describedby="technology-contact-sensitive-warning technology-contact-submission-status" className="relative z-[31] rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-white p-6 shadow-[0_12px_34px_rgb(18_32_51/8%)] sm:p-8" noValidate onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)]" id="technology-contact-form-title">{callRequest ? copy.callRequest.title : copy.title}</h2>
      {callRequest ? <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--bm-text-muted)]">{copy.callRequest.helper}</p> : null}
      <p className="mt-4 rounded-[var(--bm-radius-control)] border border-[#c9dcf6] bg-[#f4f9ff] p-4 text-sm leading-6 text-[var(--bm-text)]" id="technology-contact-sensitive-warning">{copy.sensitiveWarning}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field inputId="full_name" label={copy.fullNameLabel} required><input aria-describedby={fieldError("full_name")} aria-invalid={Boolean(errors.full_name)} autoComplete="name" className={inputClass} id="full_name" maxLength={160} name="full_name" required type="text" /><FieldError id={fieldError("full_name")} message={errors.full_name} /></Field>
        <Field inputId="email" label={copy.emailLabel} required><input aria-describedby={fieldError("email")} aria-invalid={Boolean(errors.email)} autoComplete="email" className={inputClass} id="email" maxLength={320} name="email" required type="email" /><FieldError id={fieldError("email")} message={errors.email} /></Field>
        <Field inputId="phone" label={callRequest ? copy.callRequest.phoneLabel : copy.phoneLabel} required={callRequest}><input aria-describedby={fieldError("phone")} aria-invalid={Boolean(errors.phone)} autoComplete="tel" className={inputClass} id="phone" maxLength={40} name="phone" required={callRequest} type="tel" /><FieldError id={fieldError("phone")} message={errors.phone} /></Field>
        <Field inputId="country" label={copy.countryLabel} required><input aria-describedby={fieldError("country")} aria-invalid={Boolean(errors.country)} autoComplete="country-name" className={inputClass} id="country" maxLength={100} name="country" required type="text" /><FieldError id={fieldError("country")} message={errors.country} /></Field>
        <Field inputId="company" label={copy.companyLabel}><input autoComplete="organization" className={inputClass} id="company" maxLength={160} name="company" type="text" /></Field>
        <Field inputId="interest" label={copy.interestLabel} required>
          <select aria-describedby={fieldError("interest")} aria-invalid={Boolean(errors.interest)} className={inputClass} defaultValue={callRequest ? "call-request" : ""} id="interest" name="interest" required>
            <option disabled value="">{copy.interestPlaceholder}</option>
            {copy.interestOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <FieldError id={fieldError("interest")} message={errors.interest} />
        </Field>
      </div>

      <Field className="mt-5" inputId="message" label={copy.messageLabel} required>
        <textarea aria-describedby={`technology-message-helper${errors.message ? " message-error" : ""}`} aria-invalid={Boolean(errors.message)} className={`${inputClass} min-h-36 resize-y`} id="message" maxLength={MAX_MESSAGE_LENGTH} name="message" required />
        <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]" id="technology-message-helper">{copy.messageHelper}</p>
        <FieldError id={fieldError("message")} message={errors.message} />
      </Field>

      <div className="mt-5">
        <label className="flex gap-3 text-sm leading-6 text-[var(--bm-text)]" htmlFor="privacy_consent">
          <input aria-describedby={fieldError("privacy_consent")} aria-invalid={Boolean(errors.privacy_consent)} className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--bm-border-strong)] text-[var(--bm-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" id="privacy_consent" name="privacy_consent" type="checkbox" value="yes" />
          <span>{copy.privacyConsentStart} <a className="font-semibold text-[var(--bm-brand)] underline underline-offset-2 hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={privacyHref}>{copy.privacyLinkLabel}</a> {copy.privacyConsentEnd}</span>
        </label>
        <FieldError id={fieldError("privacy_consent")} message={errors.privacy_consent} />
      </div>

      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0"><label htmlFor="website">Website</label><input autoComplete="off" id="website" maxLength={255} name="website" tabIndex={-1} type="text" /></div>

      <p aria-live="polite" className={`mt-5 text-sm leading-6 ${["error", "rate-limited", "validation-error"].includes(status) ? "text-[#9f1c1c]" : "text-[var(--bm-text)]"}`} id="technology-contact-submission-status" role={status === "error" ? "alert" : "status"}>
        {status === "submitting" ? copy.submitting : status === "validation-error" ? copy.validationError : status === "rate-limited" ? formatRateLimitError(copy.rateLimitError, rateLimitSeconds, locale) : status === "error" ? copy.temporaryError : ""}
      </p>
      {status === "error" ? (
        <section aria-labelledby="technology-contact-fallback-title" className="mt-5 rounded-[var(--bm-radius-control)] border border-[#c9dcf6] bg-[#f4f9ff] p-4">
          <h3 className="text-sm font-semibold text-[var(--bm-text)]" id="technology-contact-fallback-title">{copy.fallback.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]">{copy.fallback.body}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            {fallbackWhatsappUrl ? <a aria-label={copy.fallback.whatsappAction} className="inline-flex min-h-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={fallbackWhatsappUrl} rel="noopener noreferrer" target="_blank">{copy.fallback.whatsappAction}</a> : null}
            <a aria-label={copy.fallback.emailAction} className="inline-flex min-h-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] px-4 py-2 text-sm font-semibold text-[var(--bm-text)] transition-colors hover:border-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="mailto:support@barmentech.com">{copy.fallback.emailAction}</a>
          </div>
        </section>
      ) : null}
      <button className="mt-6 inline-flex min-h-[var(--bm-control-height)] w-full items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-brand)] bg-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[var(--bm-brand-strong)] hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" disabled={status === "submitting"} type="submit">{status === "submitting" ? copy.submitting : copy.submit}</button>
    </form>
  );
}

function getRetryAfterSeconds(value: string | null): number | null {
  if (!value || !/^\d+$/.test(value.trim())) return null;
  const seconds = Number(value);
  return Number.isSafeInteger(seconds) && seconds > 0 && seconds <= 86_400 ? seconds : null;
}

function formatRateLimitError(copy: string, seconds: number | null, locale: Locale): string {
  if (!seconds) return copy.replace("{seconds}", locale === "es" ? "un momento" : "a moment");
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return copy.replace("{seconds}", minutes > 0 ? `${minutes}m ${remainder}s` : `${remainder}s`);
}

function Field({ children, className, inputId, label, required = false }: { children: ReactNode; className?: string; inputId: string; label: string; required?: boolean }) {
  return <div className={className}><label className="text-sm font-semibold text-[var(--bm-text)]" htmlFor={inputId}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>{children}</div>;
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  return message && id ? <p className="mt-2 text-sm font-medium text-[#9f1c1c]" id={id} role="alert">{message}</p> : null;
}

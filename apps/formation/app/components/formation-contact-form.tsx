"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import type { FormationContactContent } from "../lib/site";

type FormationContactFormProps = {
  copy: FormationContactContent;
  endpoint?: string;
  initialInterest?: string;
  privacyHref: string;
  whatsappUrl?: string;
};

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export function FormationContactForm({ copy, endpoint, initialInterest, privacyHref, whatsappUrl }: FormationContactFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  if (!endpoint) {
    return (
      <section aria-labelledby="contact-fallback-title" className="rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-[var(--bm-surface-subtle)] p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-[var(--bm-text)]" id="contact-fallback-title">{copy.fallbackTitle}</h2>
        <p className="mt-3 text-base leading-7 text-[var(--bm-text-muted)]">{copy.fallbackBody}</p>
        <p className="mt-4 text-sm leading-6 text-[var(--bm-text)]">{copy.sensitiveWarning}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
          <a className="rounded-sm text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href="mailto:info@barmentech.com">info@barmentech.com</a>
          {whatsappUrl ? <a className="rounded-sm text-[var(--bm-brand)] hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={whatsappUrl} rel="noopener noreferrer" target="_blank">{copy.whatsappAlternative}</a> : null}
        </div>
      </section>
    );
  }

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {};
    const requiredFields = ["full_name", "email", "country", "interest", "message"];

    requiredFields.forEach((field) => {
      if (!String(formData.get(field) ?? "").trim()) {
        nextErrors[field] = copy.requiredField;
      }
    });

    const email = String(formData.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = copy.emailInvalid;
    }

    if (!formData.get("privacy_consent")) {
      nextErrors.privacy_consent = copy.privacyConsentRequired;
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || !endpoint) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setStatus("idle");
      return;
    }

    if (String(formData.get("website") ?? "").trim()) {
      form.reset();
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        body: formData,
        headers: { Accept: "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      form.reset();
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "mt-2 w-full rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] bg-white px-3 py-2.5 text-base text-[var(--bm-text)] shadow-sm outline-none transition-colors placeholder:text-[var(--bm-text-muted)] focus:border-[var(--bm-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]";
  const fieldError = (field: string) => errors[field] ? `${field}-error` : undefined;

  return (
    <form aria-describedby="contact-sensitive-warning contact-submission-status" className="rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-white p-6 shadow-[0_12px_34px_rgb(18_32_51/8%)] sm:p-8" noValidate onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--bm-text)]" id="contact-form-title">{copy.title}</h2>
      <p className="mt-4 rounded-[var(--bm-radius-control)] border border-[#c9dcf6] bg-[#f4f9ff] p-4 text-sm leading-6 text-[var(--bm-text)]" id="contact-sensitive-warning">{copy.sensitiveWarning}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field inputId="full_name" label={copy.fullNameLabel} required>
          <input aria-describedby={fieldError("full_name")} aria-invalid={Boolean(errors.full_name)} autoComplete="name" className={inputClass} id="full_name" name="full_name" required type="text" />
          <FieldError id={fieldError("full_name")} message={errors.full_name} />
        </Field>
        <Field inputId="email" label={copy.emailLabel} required>
          <input aria-describedby={fieldError("email")} aria-invalid={Boolean(errors.email)} autoComplete="email" className={inputClass} id="email" name="email" required type="email" />
          <FieldError id={fieldError("email")} message={errors.email} />
        </Field>
        <Field inputId="phone" label={copy.phoneLabel}>
          <input autoComplete="tel" className={inputClass} id="phone" name="phone" type="tel" />
        </Field>
        <Field inputId="country" label={copy.countryLabel} required>
          <input aria-describedby={fieldError("country")} aria-invalid={Boolean(errors.country)} autoComplete="country-name" className={inputClass} id="country" name="country" required type="text" />
          <FieldError id={fieldError("country")} message={errors.country} />
        </Field>
        <Field inputId="company" label={copy.companyLabel}>
          <input autoComplete="organization" className={inputClass} id="company" name="company" type="text" />
        </Field>
        <Field inputId="interest" label={copy.interestLabel} required>
          <select aria-describedby={fieldError("interest")} aria-invalid={Boolean(errors.interest)} className={inputClass} defaultValue={initialInterest ?? ""} id="interest" name="interest" required>
            <option disabled value="">{copy.interestPlaceholder}</option>
            {copy.interestOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
          <FieldError id={fieldError("interest")} message={errors.interest} />
        </Field>
      </div>

      <Field className="mt-5" inputId="message" label={copy.messageLabel} required>
        <textarea aria-describedby={`message-helper${errors.message ? " message-error" : ""}`} aria-invalid={Boolean(errors.message)} className={`${inputClass} min-h-36 resize-y`} id="message" maxLength={2000} name="message" required />
        <p className="mt-2 text-sm leading-6 text-[var(--bm-text-muted)]" id="message-helper">{copy.messageHelper}</p>
        <FieldError id={fieldError("message")} message={errors.message} />
      </Field>

      <div className="mt-5">
        <label className="flex gap-3 text-sm leading-6 text-[var(--bm-text)]" htmlFor="privacy_consent">
          <input aria-describedby={fieldError("privacy_consent")} aria-invalid={Boolean(errors.privacy_consent)} className="mt-1 h-4 w-4 shrink-0 rounded border-[var(--bm-border-strong)] text-[var(--bm-brand)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" id="privacy_consent" name="privacy_consent" type="checkbox" value="yes" />
          <span>{copy.privacyConsentStart} <a className="font-semibold text-[var(--bm-brand)] underline underline-offset-2 hover:text-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={privacyHref}>{copy.privacyLinkLabel}</a> {copy.privacyConsentEnd}</span>
        </label>
        <FieldError id={fieldError("privacy_consent")} message={errors.privacy_consent} />
      </div>

      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      <p aria-live="polite" className={`mt-5 text-sm leading-6 ${status === "error" ? "text-[#9f1c1c]" : "text-[var(--bm-text)]"}`} id="contact-submission-status" role="status">
        {status === "submitting" ? copy.submitting : status === "success" ? copy.success : status === "error" ? copy.providerError : ""}
      </p>
      <button className="mt-6 inline-flex min-h-[var(--bm-control-height)] w-full items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-brand)] bg-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[var(--bm-brand-strong)] hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? copy.submitting : copy.submit}
      </button>
    </form>
  );
}

function Field({ children, className, inputId, label, required = false }: { children: ReactNode; className?: string; inputId: string; label: string; required?: boolean }) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-[var(--bm-text)]" htmlFor={inputId}>
        {label}{required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
    </div>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  return message && id ? <p className="mt-2 text-sm font-medium text-[#9f1c1c]" id={id}>{message}</p> : null;
}

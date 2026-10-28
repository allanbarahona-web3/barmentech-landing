"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "../lib/i18n";
import { getPublicLeadLocale } from "../lib/public-lead-contract";

const requestTypes = {
  en: [["ACCESS", "Access my information"], ["CORRECTION", "Correct information"], ["DELETION", "Delete information"], ["WITHDRAW_CONSENT", "Withdraw consent"], ["INFORMATION", "Information about processing"], ["OTHER", "Other request"]],
  es: [["ACCESS", "Acceso a mi información"], ["CORRECTION", "Corrección de información"], ["DELETION", "Eliminación de información"], ["WITHDRAW_CONSENT", "Retiro del consentimiento"], ["INFORMATION", "Información sobre el tratamiento"], ["OTHER", "Otra solicitud"]],
} as const;

type RequestType = (typeof requestTypes.en)[number][0];
type SubmissionStatus = "idle" | "pending" | "success" | "error" | "rate";

function localizedRequestType(locale: Locale, requestType: RequestType | null) {
  return requestTypes[locale].find(([value]) => value === requestType)?.[1];
}

export function FormationPrivacyRequestDialog({ apiBaseUrl, locale, privacyHref }: { apiBaseUrl?: string; locale: Locale; privacyHref: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submittedType, setSubmittedType] = useState<RequestType | null>(null);
  const spanish = locale === "es";
  const endpoint = apiBaseUrl ? `${apiBaseUrl}/v1/public/privacy-requests` : undefined;
  const selectedType = localizedRequestType(locale, submittedType);

  useEffect(() => { if (status === "success") successHeading.current?.focus(); }, [status]);

  const close = () => {
    if (status !== "pending") {
      dialog.current?.close();
      trigger.current?.focus();
    }
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;
    const data = new FormData(event.currentTarget);
    const requestType = String(data.get("requestType") ?? "") as RequestType;
    if (!data.get("privacyAccepted")) { setStatus("error"); return; }
    setStatus("pending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);
    try {
      const response = await fetch(endpoint, {
        method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ email: String(data.get("email") ?? "").trim(), requestType, message: String(data.get("message") ?? "").trim() || undefined, locale: getPublicLeadLocale(locale), privacyAccepted: true, website: String(data.get("website") ?? "") }),
      });
      if (response.status === 201 && (await response.json() as { success?: unknown }).success === true) {
        setSubmittedType(requestType);
        setStatus("success");
      } else setStatus(response.status === 429 ? "rate" : "error");
    } catch { setStatus("error"); } finally { window.clearTimeout(timeout); }
  }

  if (!endpoint) return <a className="inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] border border-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-[var(--bm-brand)]" href="mailto:formation@barmentech.com">{spanish ? "Solicitar privacidad por correo" : "Request privacy by email"}</a>;

  return <>
    <button className="inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] border border-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-[var(--bm-brand)]" onClick={() => { setSubmittedType(null); setStatus("idle"); dialog.current?.showModal(); }} ref={trigger} type="button">{spanish ? "Enviar una solicitud de privacidad" : "Submit a privacy request"}</button>
    <p className="mt-3 text-sm text-[var(--bm-text-muted)]">{spanish ? "También puedes escribir a " : "You may also email "}<a className="underline" href="mailto:formation@barmentech.com">formation@barmentech.com</a>.</p>
    <dialog aria-labelledby="privacy-request-title" className="fixed inset-0 m-auto max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)] w-[min(calc(100vw-2rem),34rem)] overflow-y-auto overscroll-contain rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] p-0 text-[var(--bm-text)] shadow-2xl backdrop:bg-black/55" onCancel={(event) => { if (status === "pending") event.preventDefault(); else close(); }} ref={dialog}>
      <div className="p-5 sm:p-6">
        <button aria-label={spanish ? "Cerrar" : "Close"} className="float-right rounded p-1 text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" onClick={close} type="button">×</button>
        {status === "success" ? <section aria-live="polite">
          <h2 className="pr-8 text-2xl font-semibold" id="privacy-request-title" ref={successHeading} tabIndex={-1}>{spanish ? "Recibimos tu solicitud" : "We received your request"}</h2>
          {selectedType ? <p className="mt-4 font-semibold text-[var(--bm-text)]">{spanish ? "Tipo solicitado: " : "Requested type: "}{selectedType}</p> : null}
          <p className="mt-4">{spanish ? "Barmentech revisará tu solicitud. Recibirla no significa que la acción solicitada ya se haya completado, y puede ser necesario verificar tu identidad antes de tomar cualquier medida." : "Barmentech will review your request. Receiving it does not mean the requested action has already been completed, and identity verification may be required before any action is taken."}</p>
          <p className="mt-3">{spanish ? "Revisa el correo que enviaste para recibir seguimiento. No envíes documentos de identidad, registros fiscales, información bancaria, contraseñas ni otros documentos sensibles por este formulario o correo electrónico ordinario; te indicaremos un canal seguro aprobado cuando sea necesario." : "Monitor the email address you submitted for follow-up. Do not send identity documents, tax records, banking information, passwords, or other sensitive documents through this form or ordinary email; we will provide an approved secure channel when necessary."}</p>
          <button className="mt-6 inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" onClick={close} type="button">{spanish ? "Cerrar" : "Close"}</button>
        </section> : <form onSubmit={submit}>
          <h2 className="pr-8 text-2xl font-semibold" id="privacy-request-title">{spanish ? "Solicitud de privacidad" : "Privacy request"}</h2>
          <p className="mt-3 text-sm text-[var(--bm-text-muted)]">{spanish ? "No adjuntes ni escribas contraseñas, datos bancarios, documentos de identidad, números de identificación gubernamental, declaraciones fiscales ni otros datos sensibles. Si se requiere documentación para verificar tu identidad, te indicaremos un canal seguro." : "Do not include passwords, banking information, identity documents, government identification numbers, tax returns, or other sensitive information. If documentation is required to verify your identity, we will provide a secure channel."}</p>
          <label className="mt-4 block text-sm" htmlFor="privacy-request-email">Email</label>
          <input autoFocus className="mt-1 w-full rounded border border-[var(--bm-border-strong)] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" id="privacy-request-email" name="email" required type="email" />
          <label className="mt-4 block text-sm" htmlFor="privacy-request-type">{spanish ? "Tipo de solicitud" : "Request type"}</label>
          <select className="mt-1 w-full rounded border border-[var(--bm-border-strong)] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" id="privacy-request-type" name="requestType" required><option value="">—</option>{requestTypes[locale].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          <label className="mt-4 block text-sm" htmlFor="privacy-request-message">{spanish ? "Mensaje (opcional)" : "Message (optional)"}</label>
          <textarea className="mt-1 w-full rounded border border-[var(--bm-border-strong)] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" id="privacy-request-message" maxLength={1000} name="message" />
          <label className="mt-4 flex gap-2 text-sm" htmlFor="privacy-request-accepted"><input id="privacy-request-accepted" name="privacyAccepted" required type="checkbox" /><span>{spanish ? "He leído el " : "I have read the "}<a className="underline" href={privacyHref}>{spanish ? "Aviso de privacidad" : "Privacy Notice"}</a>{spanish ? " y entiendo que Barmentech puede necesitar verificar mi identidad antes de atender esta solicitud." : " and understand that Barmentech may need to verify my identity before processing this request."}</span></label>
          <input aria-hidden="true" className="hidden" name="website" tabIndex={-1} />
          <p aria-live="polite" className="mt-3 text-sm">{status === "error" ? (spanish ? "Revisa la información e inténtalo nuevamente." : "Please review the information and try again.") : status === "rate" ? (spanish ? "Espera antes de intentarlo nuevamente." : "Please wait before trying again.") : ""}</p>
          <div className="mt-5 flex flex-wrap gap-3"><button className="min-h-[var(--bm-control-height)] rounded bg-[var(--bm-brand)] px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" disabled={status === "pending"} type="submit">{status === "pending" ? (spanish ? "Enviando…" : "Sending…") : (spanish ? "Enviar solicitud" : "Submit request")}</button><button className="min-h-[var(--bm-control-height)] rounded px-4 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-brand)]" onClick={close} type="button">{spanish ? "Cancelar" : "Cancel"}</button></div>
        </form>}
      </div>
    </dialog>
  </>;
}

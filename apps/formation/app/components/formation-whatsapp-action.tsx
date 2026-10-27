import type { Locale } from "../lib/i18n";

type FormationWhatsappActionProps = {
  locale: Locale;
  url?: string;
};

export function FormationWhatsappAction({ locale, url }: FormationWhatsappActionProps) {
  if (!url) {
    return null;
  }

  const label = locale === "en" ? "Contact Barmentech on WhatsApp" : "Contactar a Barmentech por WhatsApp";

  return (
    <a
      aria-label={label}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-12 w-12 animate-[whatsapp-breathe_3s_ease-in-out_infinite] items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_20px_rgb(18_32_51/22%)] transition-colors hover:animate-none hover:bg-[#20bd5a] focus-visible:animate-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] motion-reduce:animate-none motion-reduce:transition-none sm:right-6 sm:h-14 sm:w-14"
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      title={label}
    >
      <WhatsappMark />
    </a>
  );
}

function WhatsappMark() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path d="M19.1 4.9A9.8 9.8 0 0 0 3.8 16.7L3 21l4.4-1.1A9.8 9.8 0 1 0 19.1 4.9Z" fill="white" />
      <path d="M8.1 7.4c-.2-.5-.4-.5-.7-.5h-.5c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.3 3.9 2.1.9 2.5.7 3 .7.4 0 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.7-.4l-1.5-.7c-.2-.1-.4-.1-.5.1l-.6.7c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.3-.7-.7-1.3-1.7-1.4-1.9-.1-.2 0-.4.1-.5l.4-.5.2-.4c.1-.2 0-.4 0-.5l-.7-1.7Z" fill="#25D366" />
    </svg>
  );
}

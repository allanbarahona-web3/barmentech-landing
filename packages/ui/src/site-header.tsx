"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type NavigationItem = {
  active?: boolean;
  children?: Array<{
    active?: boolean;
    href: string;
    label: string;
  }>;
  href?: string;
  id: string;
  label: string;
};

type SiteHeaderProps = {
  brand: {
    alt: string;
    ariaLabel?: string;
    division: string;
    homeHref: string;
    logoClassName?: string;
    logoHeight?: number;
    logoSrc: string;
    logoWidth?: number;
  };
  contact: {
    href: string;
    label: string;
  };
  language: {
    current: string;
    label: string;
    options: Array<{
      href: string;
      label: string;
    }>;
  };
  desktopBreakpoint?: "standard" | "wide";
  hideDivisionAtWideDesktop?: boolean;
  menu: {
    closeLabel: string;
    openLabel: string;
  };
  navigation: NavigationItem[];
  compact?: boolean;
  portal?: {
    href: string;
    label: string;
  };
  social?: {
    label: string;
    links: Array<{
      href: string;
      icon: ReactNode;
      label: string;
    }>;
  };
  sticky?: boolean;
  variant?: "default" | "formation";
};

const interactiveLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-[var(--bm-text-muted)] transition-colors hover:bg-[var(--bm-surface-subtle)] hover:text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]";

export function SiteHeader({ brand, compact = false, contact, desktopBreakpoint = "standard", hideDivisionAtWideDesktop = false, language, menu, navigation, portal, social, sticky = false, variant = "default" }: SiteHeaderProps) {
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const desktopServicesButton = useRef<HTMLButtonElement>(null);
  const mobileMenuButton = useRef<HTMLButtonElement>(null);
  const mobileServicesButton = useRef<HTMLButtonElement>(null);
  const isFormation = variant === "formation";
  const desktopVisibility = isFormation ? "min-[1280px]:flex" : desktopBreakpoint === "wide" ? "min-[1400px]:flex" : portal ? "xl:flex" : "lg:flex";
  const mobileVisibility = isFormation ? "min-[1280px]:hidden" : desktopBreakpoint === "wide" ? "min-[1400px]:hidden" : portal ? "xl:hidden" : "lg:hidden";
  const navigationLinkClass = isFormation
    ? "rounded-md px-2 py-1.5 text-[13px] font-medium text-[var(--bm-text-muted)] transition-colors duration-150 hover:bg-[#e7f3ff] hover:text-[var(--bm-text)] active:bg-[#d9edff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] motion-reduce:transition-none"
    : compact
      ? interactiveLinkClass.replace("px-3", "px-2")
      : interactiveLinkClass;

  function closeMenus() {
    setDesktopServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      if (mobileServicesOpen) {
        setMobileServicesOpen(false);
        mobileServicesButton.current?.focus();
        return;
      }

      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileMenuButton.current?.focus();
        return;
      }

      if (desktopServicesOpen) {
        setDesktopServicesOpen(false);
        desktopServicesButton.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [desktopServicesOpen, mobileMenuOpen, mobileServicesOpen]);

  return (
    <header className={`${sticky ? "sticky top-0 z-40" : ""} ${isFormation ? "border-b border-slate-200/80 bg-white/90 backdrop-blur-md" : "border-b border-[var(--bm-border)] bg-white"}`}>
      <div className={`mx-auto flex w-full max-w-[var(--bm-content-width)] items-center justify-between px-5 sm:px-8 ${isFormation ? "min-h-14 gap-3" : `min-h-20 ${compact ? "gap-2" : "gap-4"}`}`}>
        <a aria-label={brand.ariaLabel} className={`flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)] ${isFormation || compact ? "shrink-0" : "min-w-0"}`} href={brand.homeHref}>
          <img alt={brand.ariaLabel ? "" : brand.alt} className={brand.logoClassName ?? "h-auto w-28 shrink-0 sm:w-32"} height={brand.logoHeight} src={brand.logoSrc} width={brand.logoWidth} />
          {!isFormation ? (
            <span className={`max-w-24 text-[10px] font-semibold uppercase leading-4 tracking-[0.1em] text-[var(--bm-text-muted)] sm:max-w-none sm:text-xs lg:border-l lg:border-[var(--bm-border)] lg:pl-3 lg:tracking-[0.12em] ${hideDivisionAtWideDesktop ? "min-[1400px]:hidden" : ""}`}>
              {brand.division}
            </span>
          ) : null}
        </a>

        <nav aria-label={brand.division} className={`hidden ${isFormation ? "shrink-0 gap-0.5" : compact ? "shrink-0 gap-0" : "gap-1"} items-center ${desktopVisibility}`}>
          {navigation.map((item) =>
            item.children ? (
              <div className="relative" key={item.id}>
                <button
                  aria-controls="desktop-services-menu"
                  aria-expanded={desktopServicesOpen}
                  className={`${navigationLinkClass} ${compact ? "whitespace-nowrap" : ""} ${item.active ? "bg-[#e7f3ff] text-[var(--bm-text)]" : ""} inline-flex items-center gap-1`}
                  onClick={() => setDesktopServicesOpen((isOpen) => !isOpen)}
                  ref={desktopServicesButton}
                  type="button"
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} />
                </button>
                {desktopServicesOpen ? (
                  <div className="absolute left-0 z-20 mt-2 w-64 rounded-[var(--bm-radius-panel)] border border-[var(--bm-border)] bg-white p-2 shadow-[var(--bm-shadow)]" id="desktop-services-menu">
                    {item.children.map((child) => (
                      <a
                        aria-current={child.active ? "page" : undefined}
                        className={`${navigationLinkClass} ${compact ? "whitespace-nowrap" : ""} ${child.active ? "bg-[#e7f3ff] text-[var(--bm-text)]" : ""} block`}
                        href={child.href}
                        key={child.href}
                        onClick={closeMenus}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <a
                aria-current={item.active ? "page" : undefined}
                className={`${navigationLinkClass} ${compact ? "whitespace-nowrap" : ""} ${item.active ? "bg-[#e7f3ff] text-[var(--bm-text)]" : ""}`}
                href={item.href}
                key={item.id}
                onClick={closeMenus}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className={`hidden ${isFormation ? "shrink-0 gap-1.5" : compact ? "shrink-0 gap-2" : "gap-3"} items-center ${desktopVisibility}`}>
          {portal ? (
            <a className={isFormation ? "inline-flex h-8 w-[120px] shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] bg-white/60 px-2 text-[13px] font-semibold text-[var(--bm-text)] transition-colors hover:border-[var(--bm-text)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" : "inline-flex min-h-[var(--bm-control-height)] items-center whitespace-nowrap rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] px-3 text-sm font-semibold text-[var(--bm-text)] transition-colors hover:border-[var(--bm-text)] hover:bg-[var(--bm-surface-subtle)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]"} href={portal.href}>
              {portal.label}
            </a>
          ) : null}
          <a className={`inline-flex ${isFormation ? "h-8 w-[120px] shrink-0 animate-[contact-breathe_3s_ease-in-out_infinite] justify-center px-2 text-[13px] hover:animate-none focus-visible:animate-none motion-reduce:animate-none" : "min-h-[var(--bm-control-height)] px-4 text-sm"} items-center rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] font-semibold text-white transition-colors hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] ${compact ? "whitespace-nowrap" : ""}`} href={contact.href}>
            {contact.label}
          </a>
          <div aria-label={language.label} className={`flex items-center gap-1 rounded-md border border-[var(--bm-border)] ${isFormation ? "h-8 w-[120px] shrink-0 bg-white/60 p-0.5" : "p-1"}`}>
            {language.options.map((option) => (
              <a
                aria-current={language.current === option.label ? "page" : undefined}
                className={`rounded ${isFormation ? "flex h-full flex-1 items-center justify-center px-1 py-1 text-[11px]" : "px-2 py-1 text-xs"} font-semibold ${language.current === option.label ? "bg-[#cfe8ff] text-[var(--bm-text)]" : "text-[var(--bm-text-muted)] hover:bg-[#e7f3ff] hover:text-[var(--bm-text)]"} focus-visible:outline-2 focus-visible:outline-[var(--bm-focus)]`}
                href={option.href}
                key={option.label}
              >
                {option.label}
              </a>
            ))}
          </div>
          {social?.links.length ? (
            <nav aria-label={social.label} className="flex items-center gap-1">
              {social.links.map((link) => (
                <a aria-label={link.label} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--bm-text-muted)] transition-colors hover:bg-white/70 hover:text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                  {link.icon}
                </a>
              ))}
            </nav>
          ) : null}
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? menu.closeLabel : menu.openLabel}
          className={`inline-flex ${isFormation ? "min-h-10 min-w-10 bg-white/60" : "min-h-[var(--bm-control-height)] min-w-[var(--bm-control-height)]"} items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-border)] text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] ${mobileVisibility}`}
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          ref={mobileMenuButton}
          type="button"
        >
          {mobileMenuOpen ? <X aria-hidden="true" size={20} strokeWidth={1.75} /> : <Menu aria-hidden="true" size={20} strokeWidth={1.75} />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav aria-label={brand.division} className={`border-t border-[var(--bm-border)] ${isFormation ? "bg-white/95 backdrop-blur-md" : "bg-white"} px-5 py-4 ${mobileVisibility}`} id="mobile-navigation">
          <div className="mx-auto flex w-full max-w-[var(--bm-content-width)] flex-col gap-1">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.id}>
                  <button
                    aria-controls="mobile-services-menu"
                    aria-expanded={mobileServicesOpen}
                    className="flex min-h-[var(--bm-control-height)] w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]"
                    onClick={() => setMobileServicesOpen((isOpen) => !isOpen)}
                    ref={mobileServicesButton}
                    type="button"
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} />
                  </button>
                  {mobileServicesOpen ? (
                    <div className="ml-3 border-l border-[var(--bm-border)] pl-3" id="mobile-services-menu">
                      {item.children.map((child) => (
                        <a
                          aria-current={child.active ? "page" : undefined}
                          className={`${interactiveLinkClass} ${child.active ? "bg-[var(--bm-surface-subtle)] text-[var(--bm-text)]" : ""} block`}
                          href={child.href}
                          key={child.href}
                          onClick={closeMenus}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <a
                  aria-current={item.active ? "page" : undefined}
                  className={`${interactiveLinkClass} ${item.active ? "bg-[var(--bm-surface-subtle)] text-[var(--bm-text)]" : ""} block`}
                  href={item.href}
                  key={item.id}
                  onClick={closeMenus}
                >
                  {item.label}
                </a>
              ),
            )}
            {portal ? (
              <a className="mt-2 inline-flex min-h-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-border-strong)] px-4 text-sm font-semibold text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={portal.href} onClick={closeMenus}>
                {portal.label}
              </a>
            ) : null}
            <div aria-label={language.label} className="mt-3 flex items-center gap-2 border-t border-[var(--bm-border)] pt-4">
              {language.options.map((option) => (
                <a
                  aria-current={language.current === option.label ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-semibold ${language.current === option.label ? "bg-[var(--bm-surface-subtle)] text-[var(--bm-text)]" : "text-[var(--bm-text-muted)]"} focus-visible:outline-2 focus-visible:outline-[var(--bm-focus)]`}
                  href={option.href}
                  key={option.label}
                  onClick={closeMenus}
                >
                  {option.label}
                </a>
              ))}
            </div>
            <a className="mt-2 inline-flex min-h-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] px-4 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={contact.href} onClick={closeMenus}>
              {contact.label}
            </a>
            {social?.links.length ? (
              <nav aria-label={social.label} className="mt-3 flex items-center gap-2 border-t border-[var(--bm-border)] pt-4">
                {social.links.map((link) => (
                  <a aria-label={link.label} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--bm-text-muted)] transition-colors hover:bg-[var(--bm-surface-subtle)] hover:text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={link.href} key={link.href} onClick={closeMenus} rel="noopener noreferrer" target="_blank">
                    {link.icon}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

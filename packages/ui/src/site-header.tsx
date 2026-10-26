"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    division: string;
    homeHref: string;
    logoSrc: string;
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
  menu: {
    closeLabel: string;
    openLabel: string;
  };
  navigation: NavigationItem[];
};

const interactiveLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-[var(--bm-text-muted)] transition-colors hover:bg-[var(--bm-surface-subtle)] hover:text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]";

export function SiteHeader({ brand, contact, language, menu, navigation }: SiteHeaderProps) {
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const desktopServicesButton = useRef<HTMLButtonElement>(null);
  const mobileMenuButton = useRef<HTMLButtonElement>(null);
  const mobileServicesButton = useRef<HTMLButtonElement>(null);

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
    <header className="border-b border-[var(--bm-border)] bg-white">
      <div className="mx-auto flex min-h-20 w-full max-w-[var(--bm-content-width)] items-center justify-between gap-4 px-5 sm:px-8">
        <a className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bm-focus)]" href={brand.homeHref}>
          <img alt={brand.alt} className="h-auto w-28 shrink-0 sm:w-32" src={brand.logoSrc} />
          <span className="max-w-24 text-[10px] font-semibold uppercase leading-4 tracking-[0.1em] text-[var(--bm-text-muted)] sm:max-w-none sm:text-xs lg:border-l lg:border-[var(--bm-border)] lg:pl-3 lg:tracking-[0.12em]">
            {brand.division}
          </span>
        </a>

        <nav aria-label={brand.division} className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <div className="relative" key={item.id}>
                <button
                  aria-controls="desktop-services-menu"
                  aria-expanded={desktopServicesOpen}
                  className={`${interactiveLinkClass} ${item.active ? "bg-[var(--bm-surface-subtle)] text-[var(--bm-text)]" : ""} inline-flex items-center gap-1`}
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
                className={`${interactiveLinkClass} ${item.active ? "bg-[var(--bm-surface-subtle)] text-[var(--bm-text)]" : ""}`}
                href={item.href}
                key={item.id}
                onClick={closeMenus}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div aria-label={language.label} className="flex items-center gap-1 rounded-md border border-[var(--bm-border)] p-1">
            {language.options.map((option) => (
              <a
                aria-current={language.current === option.label ? "page" : undefined}
                className={`rounded px-2 py-1 text-xs font-semibold ${language.current === option.label ? "bg-[var(--bm-surface-subtle)] text-[var(--bm-text)]" : "text-[var(--bm-text-muted)] hover:text-[var(--bm-text)]"} focus-visible:outline-2 focus-visible:outline-[var(--bm-focus)]`}
                href={option.href}
                key={option.label}
              >
                {option.label}
              </a>
            ))}
          </div>
          <a className="inline-flex min-h-[var(--bm-control-height)] items-center rounded-[var(--bm-radius-control)] bg-[var(--bm-brand)] px-4 text-sm font-semibold text-white transition-colors hover:bg-[var(--bm-brand-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)]" href={contact.href}>
            {contact.label}
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? menu.closeLabel : menu.openLabel}
          className="inline-flex min-h-[var(--bm-control-height)] min-w-[var(--bm-control-height)] items-center justify-center rounded-[var(--bm-radius-control)] border border-[var(--bm-border)] text-[var(--bm-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--bm-focus)] lg:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          ref={mobileMenuButton}
          type="button"
        >
          {mobileMenuOpen ? <X aria-hidden="true" size={20} strokeWidth={1.75} /> : <Menu aria-hidden="true" size={20} strokeWidth={1.75} />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav aria-label={brand.division} className="border-t border-[var(--bm-border)] bg-white px-5 py-4 lg:hidden" id="mobile-navigation">
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
          </div>
        </nav>
      ) : null}
    </header>
  );
}

"use client";

import { useEffect } from "react";

type StickyShowcaseReleaseProps = {
  finalHeadingId: string;
  sectionHeadingId: string;
};

export function StickyShowcaseRelease({ finalHeadingId, sectionHeadingId }: StickyShowcaseReleaseProps) {
  useEffect(() => {
    const sectionHeading = document.getElementById(sectionHeadingId);
    const finalHeading = document.getElementById(finalHeadingId);
    const stickyEditorial = sectionHeading?.closest<HTMLElement>("[data-sticky-editorial]");
    const finalShowcase = finalHeading?.closest<HTMLElement>("section");

    if (!stickyEditorial || !finalShowcase) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const syncRelease = () => {
      const stickyTop = 80;
      const releaseBuffer = 32;
      const shouldRelease = desktopQuery.matches && finalShowcase.getBoundingClientRect().top <= stickyTop + releaseBuffer;
      stickyEditorial.dataset.stickyReleased = String(shouldRelease);
    };

    window.addEventListener("resize", syncRelease);
    window.addEventListener("scroll", syncRelease, { passive: true });
    desktopQuery.addEventListener("change", syncRelease);
    syncRelease();

    return () => {
      window.removeEventListener("resize", syncRelease);
      window.removeEventListener("scroll", syncRelease);
      desktopQuery.removeEventListener("change", syncRelease);
    };
  }, [finalHeadingId, sectionHeadingId]);

  return null;
}

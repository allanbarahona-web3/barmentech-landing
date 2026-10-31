"use client";

import { useEffect } from "react";

export function TechnologyHeaderSurface() {
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>("[data-technology-shell]");

    if (!shell) {
      return;
    }

    const updateSurface = () => {
      shell.dataset.technologyScrolled = window.scrollY > 16 ? "true" : "false";
    };

    updateSurface();
    window.addEventListener("scroll", updateSurface, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateSurface);
      delete shell.dataset.technologyScrolled;
    };
  }, []);

  return null;
}

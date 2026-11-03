"use client";

import { useEffect } from "react";

export function AutomationCapabilityAnimations({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-automation-capability-panel]"));
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      section.dataset.automationMotion = motionQuery.matches ? "reduced" : "allowed";
      panels.forEach((panel) => {
        panel.dataset.automationVisible = motionQuery.matches ? "true" : "false";
      });
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    if (motionQuery.matches) {
      return () => motionQuery.removeEventListener("change", updateMotionPreference);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const panel = entry.target as HTMLElement;
          panel.dataset.automationVisible = entry.isIntersecting ? "true" : "false";

          if (entry.isIntersecting) {
            panel.dataset.automationEntered = "true";
          }
        });
      },
      { threshold: 0.15 },
    );

    panels.forEach((panel) => observer.observe(panel));

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, [sectionId]);

  return null;
}

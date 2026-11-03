"use client";

import { useEffect } from "react";

export function SystemWorkflowBorderAnimation({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      section.dataset.systemWorkflowMotion = motionQuery.matches ? "reduced" : "allowed";
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    if (motionQuery.matches) {
      return () => motionQuery.removeEventListener("change", updateMotionPreference);
    }

    const trigger = section.querySelector("[data-system-workflow-cards]") ?? section;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          section.dataset.systemWorkflowEntered = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, [sectionId]);

  return null;
}

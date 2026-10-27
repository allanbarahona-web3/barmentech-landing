import type { Locale } from "../lib/i18n";
import type { FormationSocialNetwork } from "../lib/public-settings";

const socialNames: Record<FormationSocialNetwork, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  x: "X",
  youtube: "YouTube",
};

export function getFormationSocialLabel(locale: Locale, network: FormationSocialNetwork) {
  const networkName = socialNames[network];
  return locale === "en" ? `Follow Barmentech on ${networkName}` : `Seguir a Barmentech en ${networkName}`;
}

const brandColorClasses: Record<FormationSocialNetwork, string> = {
  facebook: "text-[#1877F2]",
  instagram: "text-[#E4405F]",
  linkedin: "text-[#0A66C2]",
  x: "text-black",
  youtube: "text-[#FF0000]",
};

export function FormationSocialMark({ className = "h-7 w-7", network, useBrandColor = false }: { className?: string; network: FormationSocialNetwork; useBrandColor?: boolean }) {
  const marks: Record<FormationSocialNetwork, string> = {
    facebook: "f",
    instagram: "◎",
    linkedin: "in",
    x: "X",
    youtube: "▶",
  };

  return (
    <svg aria-hidden="true" className={`${className} ${useBrandColor ? brandColorClasses[network] : ""}`} viewBox="0 0 24 24">
      <text fill="currentColor" fontFamily="Arial, sans-serif" fontSize={network === "linkedin" ? "11" : "15"} fontWeight="700" textAnchor="middle" x="12" y="17">
        {marks[network]}
      </text>
    </svg>
  );
}

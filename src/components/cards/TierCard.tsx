import { Check } from "@phosphor-icons/react";
import type { SponsorTier } from "@/lib/types";

interface TierCardProps {
  tier: SponsorTier;
}

export default function TierCard({ tier }: TierCardProps) {
  return (
    <div
      className={`group relative h-full p-6 surface transition-all duration-300 hover:-translate-y-1 ${
        tier.highlight
          ? "border border-primary/40"
          : "border border-white/[0.06] surface-interactive"
      }`}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-sm bg-primary text-white text-[10px] font-semibold uppercase tracking-wider">
          Top Tier
        </span>
      )}
      <h3 className="font-heading text-lg font-semibold text-text">
        {tier.name}
      </h3>
      <p className="font-heading text-3xl font-bold text-primary mt-1 mb-1">
        {tier.price}
      </p>
      <p className="text-xs text-muted uppercase tracking-wider mb-4">
        {tier.tagline}
      </p>
      <ul className="space-y-2.5">
        {tier.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-text/80">
            <Check
              size={16}
              weight="bold"
              className="text-primary shrink-0 mt-0.5"
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

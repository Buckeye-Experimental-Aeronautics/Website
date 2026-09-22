import { getIcon } from "@/lib/icons";
import type { Pillar } from "@/lib/types";

interface PillarCardProps {
  pillar: Pillar;
}

export default function PillarCard({ pillar }: PillarCardProps) {
  const Icon = getIcon(pillar.icon);

  return (
    <div className="group h-full p-6 surface transition-all duration-300 surface-interactive">
      <div className="mb-4">
        <Icon size={36} weight="duotone" className="text-primary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-text mb-2">
        {pillar.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {pillar.description}
      </p>
    </div>
  );
}

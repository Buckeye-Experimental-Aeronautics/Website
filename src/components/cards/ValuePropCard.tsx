import { getIcon } from "@/lib/icons";
import type { ValueProp } from "@/lib/types";

interface ValuePropCardProps {
  prop: ValueProp;
}

export default function ValuePropCard({ prop }: ValuePropCardProps) {
  const Icon = getIcon(prop.icon);

  return (
    <div className="group h-full p-6 surface transition-all duration-300 surface-interactive">
      <div className="mb-4">
        <Icon size={36} weight="duotone" className="text-primary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-text mb-2">
        {prop.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">{prop.body}</p>
    </div>
  );
}

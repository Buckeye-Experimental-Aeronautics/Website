import { getIcon } from "@/lib/icons";
import type { TeamDetail } from "@/lib/types";

interface TeamCardProps {
  team: TeamDetail;
}

export default function TeamCard({ team }: TeamCardProps) {
  const Icon = getIcon(team.icon);

  return (
    <div
      id={team.slug}
      className="group h-full p-6 surface transition-all duration-300 surface-interactive scroll-mt-24"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="shrink-0 p-3 rounded-[3px] bg-primary/10">
          <Icon size={32} weight="duotone" className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-text">
            {team.name}
          </h3>
          <p className="text-sm text-muted mt-0.5">
            Lead: {team.lead}
          </p>
        </div>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-5">
        {team.description}
      </p>

      {/* Software */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Software & Tools
        </h4>
        <div className="flex flex-wrap gap-2">
          {team.software.map((sw) => (
            <span
              key={sw}
              className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs bg-white/5 text-text/80 border border-white/[0.06]"
            >
              {sw}
            </span>
          ))}
        </div>
      </div>

      {/* Hardware */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Hardware
        </h4>
        <div className="flex flex-wrap gap-2">
          {team.hardware.map((hw) => (
            <span
              key={hw}
              className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs bg-white/5 text-text/80 border border-white/[0.06]"
            >
              {hw}
            </span>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
          Skills Needed
        </h4>
        <div className="flex flex-wrap gap-2">
          {team.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs bg-primary/10 text-primary border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { PrototypeDetail } from "@/lib/types";

interface EffortDetailCardProps {
  effort: PrototypeDetail;
}

export default function EffortDetailCard({ effort }: EffortDetailCardProps) {
  const isActive = effort.badge === "Active";

  return (
    <div className="p-6 surface transition-all duration-300 surface-interactive">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-heading text-xl font-semibold text-text">
              {effort.title}
            </h3>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${
                isActive
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-neutral/10 text-neutral border border-neutral/20"
              }`}
            >
              {effort.badge}
            </span>
          </div>

          <p className="text-xs text-muted mb-3">{effort.timeline}</p>

          <div className="mb-4">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
              Objective
            </h4>
            <p className="text-sm text-text/90 leading-relaxed">
              {effort.objective}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Key Milestones
            </h4>
            <div className="flex flex-wrap gap-2">
              {effort.milestones.map((ms) => (
                <span
                  key={ms}
                  className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs bg-white/5 text-text/80 border border-white/[0.06]"
                >
                  {ms}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
              Teams Involved
            </h4>
            <div className="flex flex-wrap gap-2">
              {effort.teamsInvolved.map((team) => (
                <span
                  key={team}
                  className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs bg-primary/10 text-primary border border-primary/20"
                >
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: photo, or a placeholder box until there is one */}
        <div className="md:w-64 shrink-0">
          {effort.image ? (
            <img
              src={effort.image}
              alt={effort.imageAlt ?? effort.title}
              loading="lazy"
              decoding="async"
              className="w-full h-48 md:h-full md:min-h-[200px] object-cover rounded-lg border border-white/[0.06]"
            />
          ) : (
            <div className="w-full h-40 md:h-full rounded-lg bg-border/30 border border-border/50 flex items-center justify-center">
              <span className="text-xs text-muted">[Photo TBD]</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { PROGRAM_PHASES } from "@/lib/constants";

/**
 * The flight program as a horizontal timeline.
 *
 * Sequence is the point, so this is a timeline rather than a row of cards.
 * The filled segment and solid dot mark what is actually underway; everything
 * after it is hollow. On narrow screens the line turns vertical so the phases
 * stay readable instead of being squeezed.
 */
export default function ProgramTimeline() {
  return (
    <section className="bg-bg py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10 md:mb-14">
          <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
            Supersonic flight program.
          </h2>
          <Link
            to="/efforts"
            className="inline-flex h-9 px-4 items-center border border-border text-xs font-medium text-text transition-colors hover:border-muted"
            style={{ borderRadius: "var(--radius-panel)" }}
          >
            See the full program &rarr;
          </Link>
        </div>

        <ol className="list-none p-0 m-0 grid gap-8 md:gap-0 md:grid-cols-4">
          {PROGRAM_PHASES.map((phase, i) => {
            const active = phase.status === "In progress";
            return (
              <li key={phase.period} className="relative md:pr-6">
                {/* Rule: solid up to the active phase, hairline after it */}
                <div
                  aria-hidden="true"
                  className={`hidden md:block absolute left-0 right-0 top-[5px] h-px ${
                    i === 0 ? "bg-primary" : "bg-border"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`hidden md:block absolute left-0 top-0 w-[11px] h-[11px] rounded-full ${
                    active
                      ? "bg-primary"
                      : "bg-bg border border-muted/70"
                  }`}
                />
                <div className="md:pt-7">
                  <p
                    className={`text-[11px] uppercase tracking-[0.14em] ${
                      active ? "text-accent" : "text-muted"
                    }`}
                  >
                    {phase.period}
                    {active && " · In progress"}
                  </p>
                  <p className="mt-1.5 font-heading text-sm md:text-[0.95rem] font-semibold text-text leading-snug">
                    {phase.title}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

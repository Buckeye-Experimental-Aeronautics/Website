import { Link } from "react-router-dom";

/**
 * Two audiences, two panels, side by side. Sponsors and students want
 * different things, so they get separate doors rather than one generic
 * "get involved" band. The student panel carries the crimson because
 * recruiting is the primary action.
 */
export default function DualCTASection() {
  return (
    <section className="bg-bg pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-4">
        <div
          className="surface p-7 md:p-9 flex flex-col"
          style={{ borderRadius: "var(--radius-panel)" }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Sponsors and faculty
          </p>
          <h2 className="mt-2 font-heading text-xl md:text-2xl font-bold tracking-tight">
            Work with us.
          </h2>
          <div className="mt-auto pt-6">
            <Link
              to="/sponsor"
              className="inline-flex h-10 px-5 items-center justify-center border border-border text-sm font-semibold text-text transition-colors hover:border-muted"
              style={{ borderRadius: "var(--radius-panel)" }}
            >
              Partner with us
            </Link>
          </div>
        </div>

        <div
          className="bg-crimson text-white p-7 md:p-9 flex flex-col"
          style={{ borderRadius: "var(--radius-panel)" }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/65">
            Students
          </p>
          <h2 className="mt-2 font-heading text-xl md:text-2xl font-bold tracking-tight">
            Come build with us.
          </h2>
          <div className="mt-auto pt-6">
            <Link
              to="/join"
              className="inline-flex h-10 px-5 items-center justify-center bg-white text-crimson text-sm font-semibold transition-colors hover:bg-white/90"
              style={{ borderRadius: "var(--radius-panel)" }}
            >
              Join the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

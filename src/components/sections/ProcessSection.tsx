import { PROCESS_STEPS_DETAIL } from "@/lib/constants";

/**
 * The one light section on the site. A single change of ground does more for
 * page rhythm than another dark section with different card styling would.
 *
 * The four steps are a numbered list with rules between them, not four tiles.
 * They are a sequence, so they are numbered.
 */
export default function ProcessSection() {
  return (
    <section id="process" className="bg-paper text-paper-ink py-14 md:py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="max-w-sm">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              Slow is smooth, smooth is fast.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-paper-muted">
              We run NASA's systems-engineering process: written requirements,
              staged design reviews, and evidence at every gate. If we can't
              explain why it flies, it doesn't fly.
            </p>
          </div>

          <ol className="list-none p-0 m-0">
            {PROCESS_STEPS_DETAIL.map((step, i) => (
              <li
                key={step.label}
                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3.5 border-b border-paper-rule first:border-t"
              >
                <span className="font-heading text-xs font-bold text-crimson tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-heading text-base md:text-lg font-bold tracking-tight">
                  {step.label}
                </span>
                <span className="text-xs md:text-sm text-paper-muted text-right">
                  {step.note}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

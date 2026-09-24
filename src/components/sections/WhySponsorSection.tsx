import { SPONSOR_VALUE_PROPS } from "@/lib/constants";

/**
 * Three reasons as ruled rows in a split layout, not three icon cards.
 *
 * These are paragraphs of argument, not independently actionable objects, so
 * they do not earn card treatment. The structure deliberately matches the
 * process section on the home page: heading held left, numbered rows right.
 * Reusing one pattern across pages is what makes the site read as one site.
 */
export default function WhySponsorSection() {
  return (
    <section className="bg-bg py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="max-w-sm">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight leading-tight">
              What Sponsorship Actually Buys
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              We are a student team building real hardware on a student budget.
              Money goes into parts, machine time, and test campaigns, and it
              shows up on the aircraft.
            </p>
          </div>

          <ol className="list-none p-0 m-0">
            {SPONSOR_VALUE_PROPS.map((prop, i) => (
              <li
                key={prop.title}
                className="grid grid-cols-[auto_1fr] gap-4 py-4 border-b border-hairline first:border-t"
              >
                <span className="font-heading text-xs font-bold text-accent tabular-nums pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-base md:text-lg font-bold tracking-tight text-text">
                    {prop.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
                    {prop.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

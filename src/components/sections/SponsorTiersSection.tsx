import { Check } from "@phosphor-icons/react";
import { SPONSOR_TIERS, CONTACT_EMAIL } from "@/lib/constants";

/**
 * Tiers as a comparison matrix rather than four floating cards.
 *
 * The tiers are cumulative: each one reads "everything in the last, plus".
 * Four separate cards force the reader to hold four taglines in their head to
 * work out what a given amount actually buys. A matrix shows it in one look,
 * and it is how an engineer compares options anyway.
 *
 * `SPONSOR_TIERS` stores each tier's *incremental* benefits, which is the
 * right shape for the content file. The cumulative set is derived here.
 */

/** Every benefit in tier order, de-duplicated, with the tier it first appears in */
function buildMatrix() {
  const rows: { label: string; from: number }[] = [];
  SPONSOR_TIERS.forEach((tier, tierIndex) => {
    tier.benefits.forEach((benefit) => {
      if (!rows.some((r) => r.label === benefit)) {
        rows.push({ label: benefit, from: tierIndex });
      }
    });
  });
  return rows;
}

export default function SponsorTiersSection() {
  const rows = buildMatrix();

  return (
    <section className="bg-bg py-14 md:py-20 border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end mb-8 md:mb-10">
          <div className="max-w-md">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
              Sponsorship Tier Breakdown:
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              What is included with your investment in us?
            </p>
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "BExA Sponsorship"
            )}`}
            className="inline-flex h-10 px-5 items-center justify-center bg-primary text-white text-sm font-semibold transition-colors hover:bg-primary/90 shrink-0 justify-self-start"
            style={{ borderRadius: "var(--radius-panel)" }}
          >
            Contact
          </a>
        </div>

        {/* Narrow screens get the stacked list below instead. A four-column
            matrix at 390px shows one tier at a time, which is worse than no
            matrix at all, and the horizontal scroll dragged the whole page
            sideways with it. */}
        <div className="hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Sponsorship levels and the benefits included at each amount
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="w-[46%] py-3 pr-4 align-bottom text-[11px] uppercase tracking-[0.14em] text-muted font-medium"
                >
                  Benefit
                </th>
                {SPONSOR_TIERS.map((tier) => (
                  <th
                    key={tier.name}
                    scope="col"
                    className="py-3 px-2 align-bottom border-b-2 border-hairline"
                  >
                    <span
                      className={`block font-heading text-sm font-bold tracking-tight ${
                        tier.highlight ? "text-accent" : "text-text"
                      }`}
                    >
                      {tier.name}
                    </span>
                    <span className="block mt-0.5 font-heading text-lg md:text-xl font-bold tabular-nums text-text">
                      {tier.price}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-hairline">
                  <th
                    scope="row"
                    className="py-3 pr-4 text-sm font-normal text-text/85 leading-snug"
                  >
                    {row.label}
                  </th>
                  {SPONSOR_TIERS.map((tier, tierIndex) => {
                    const included = tierIndex >= row.from;
                    return (
                      <td key={tier.name} className="py-3 px-2">
                        {/* Both states centre inside the same box. The check
                            is an inline SVG on the text baseline and the dash
                            was a 1px box on the middle, so they never sat on
                            the same line. */}
                        <span className="flex items-center justify-center h-4">
                          {included ? (
                            <>
                              <Check
                                size={15}
                                weight="bold"
                                aria-hidden="true"
                                className={
                                  tier.highlight
                                    ? "text-accent"
                                    : "text-primary"
                                }
                              />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            <>
                              <span
                                aria-hidden="true"
                                className="block w-2 h-px bg-border"
                              />
                              <span className="sr-only">Not included</span>
                            </>
                          )}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one block per tier, each listing everything it includes.
            Spelled out in full rather than "everything in Gray, plus", so a
            reader does not have to scroll back up to price a level. */}
        <ul className="md:hidden list-none p-0 m-0 border-t border-hairline">
          {SPONSOR_TIERS.map((tier, tierIndex) => (
            <li
              key={tier.name}
              className="py-5 border-b border-hairline"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className={`font-heading text-base font-bold tracking-tight ${
                    tier.highlight ? "text-accent" : "text-text"
                  }`}
                >
                  {tier.name}
                </span>
                <span className="font-heading text-xl font-bold tabular-nums text-text">
                  {tier.price}
                </span>
              </div>
              <ul className="list-none p-0 mt-3 m-0 grid gap-1.5">
                {rows
                  .filter((r) => r.from <= tierIndex)
                  .map((r) => (
                    <li
                      key={r.label}
                      className="grid grid-cols-[auto_1fr] gap-2.5 items-start"
                    >
                      <Check
                        size={13}
                        weight="bold"
                        aria-hidden="true"
                        className={`mt-[3px] ${
                          tier.highlight ? "text-accent" : "text-primary"
                        }`}
                      />
                      <span className="text-sm text-text/85 leading-snug">
                        {r.label}
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs text-muted leading-relaxed max-w-2xl">
          Levels are a starting point, not a menu. If your company wants
          something that is not listed, or wants to contribute hardware,
          machine time, or software licences instead of funding, email us and
          we will work out what makes sense.
        </p>
      </div>
    </section>
  );
}

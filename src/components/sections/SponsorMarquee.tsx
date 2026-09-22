import { SPONSORS } from "@/lib/constants";

/**
 * Sponsor names on a light band, running continuously.
 *
 * The list renders twice so the CSS translate can loop at -50% seamlessly;
 * the duplicate is aria-hidden so screen readers hear each sponsor once.
 * Renders nothing at all when there are no sponsors, rather than showing
 * placeholder slots.
 */
export default function SponsorMarquee() {
  if (SPONSORS.length === 0) return null;

  const run = (hidden: boolean) =>
    SPONSORS.map((s, i) => (
      <span
        key={`${hidden ? "b" : "a"}-${s.name}-${i}`}
        className="shrink-0 px-8 md:px-12 flex items-center"
      >
        {s.logo ? (
          <img
            src={s.logo}
            alt={s.name}
            height={28}
            className="h-6 md:h-7 w-auto object-contain opacity-70"
          />
        ) : (
          <span className="font-heading text-sm md:text-base font-semibold tracking-tight text-paper-ink/70 whitespace-nowrap">
            {s.name}
          </span>
        )}
      </span>
    ));

  return (
    <section
      aria-label="Our sponsors"
      className="bg-paper border-y border-paper-rule py-5 md:py-6"
    >
      <div className="marquee">
        <div className="marquee-track">
          <div className="flex items-center">{run(false)}</div>
          <div className="flex items-center" aria-hidden="true">
            {run(true)}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { TEAMS_PREVIEW } from "@/lib/constants";
import teamGroupPhoto from "@/assets/team-group.jpg";

/**
 * The seven sub-teams as a numbered strip rather than seven identical cards.
 *
 * The strip is skewed slightly so it reads as one continuous object with
 * divisions, not a row of separate tiles. Text inside is counter-skewed so it
 * stays upright. Scrolls horizontally on narrow screens instead of wrapping
 * into a grid, which would put us back at cards.
 */
export default function TeamsStrip() {
  return (
    <section className="bg-bg pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-start mb-10">
          <div className="max-w-md">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight">
              Our teams.
            </h2>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Seven subteams, one aircraft. Every division works from the same
              test data and the same review process.
            </p>
          </div>
          <img
            src={teamGroupPhoto}
            alt="BExA members with the V01 test bed aircraft"
            width={2000}
            height={1019}
            loading="lazy"
            decoding="async"
            className="w-full md:w-[260px] lg:w-[300px] h-32 md:h-[110px] object-cover"
            style={{ borderRadius: "var(--radius-panel)" }}
          />
        </div>
      </div>

      {/* Full-bleed strip. Skew is on the container; content is un-skewed. */}
      <div className="overflow-x-auto md:overflow-visible">
        <div className="max-w-6xl mx-auto px-4">
          <ul
            className="list-none p-0 m-0 flex md:grid md:grid-cols-8 min-w-max md:min-w-0 border border-hairline bg-surface md:-skew-x-[9deg]"
            style={{ borderRadius: "var(--radius-panel)" }}
          >
            {TEAMS_PREVIEW.map((team, i) => (
              <li
                key={team.slug}
                className="border-r border-hairline last:border-r-0"
              >
                <Link
                  to={`/teams#${team.slug}`}
                  className="block px-5 py-4 md:px-3 md:py-5 h-full transition-colors hover:bg-surface-raised md:skew-x-[9deg]"
                >
                  <span className="block text-[10px] font-semibold text-accent tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="block mt-1.5 font-heading text-xs md:text-[0.78rem] font-semibold text-text leading-tight whitespace-nowrap md:whitespace-normal">
                    {team.name}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/teams"
                className="block px-5 py-4 md:px-3 md:py-5 h-full transition-colors hover:bg-surface-raised md:skew-x-[9deg]"
              >
                <span className="block mt-[18px] font-heading text-xs md:text-[0.78rem] font-semibold text-accent leading-tight whitespace-nowrap">
                  Meet the team &rarr;
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

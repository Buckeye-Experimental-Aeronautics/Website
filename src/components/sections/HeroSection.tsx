import { Link } from "react-router-dom";
import heroPhoto from "@/assets/edf-test-bed.jpg";

/**
 * Crimson full-bleed hero. Left aligned, two short sentences, photo on the
 * right. Deliberately not a full-viewport centered headline: the job is to
 * say what BExA is and get out of the way of the program timeline below.
 */
export default function HeroSection() {
  return (
    <section className="bg-crimson text-white">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">
          <div className="max-w-xl">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-[1.1] tracking-tight">
              We build engineers.
              <br />
              Aircraft are how.
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/80 max-w-md">
              Ohio State's student team for experimental aircraft. We design,
              build and flight-test, then do it again, faster.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/join"
                className="inline-flex h-10 px-5 items-center justify-center bg-white text-crimson text-sm font-semibold transition-colors hover:bg-white/90"
                style={{ borderRadius: "var(--radius-panel)" }}
              >
                Join the team
              </Link>
              <Link
                to="/sponsor"
                className="inline-flex h-10 px-5 items-center justify-center border border-white/60 text-white text-sm font-semibold transition-colors hover:bg-white/10"
                style={{ borderRadius: "var(--radius-panel)" }}
              >
                Sponsor us
              </Link>
            </div>
          </div>

          <figure className="m-0 w-full md:w-[380px] lg:w-[440px]">
            <img
              src={heroPhoto}
              alt="BExA's electric ducted fan test bed aircraft"
              width={1200}
              height={800}
              className="w-full h-52 sm:h-64 md:h-[260px] object-cover"
              style={{ borderRadius: "var(--radius-panel)" }}
            />
            <figcaption className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/75">
              V01 EDF platform
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

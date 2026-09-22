interface PageHeroProps {
  heading: string;
  subtext: string;
  /** Small uppercase label above the heading, for section orientation */
  eyebrow?: string;
  /** Full-bleed photo butted directly under the crimson band */
  image?: string;
  imageAlt?: string;
  /** Intrinsic size, so the browser reserves the space before the image lands */
  imageWidth?: number;
  imageHeight?: number;
  /** Crop height for the photo band on desktop */
  imageHeightClass?: string;
  /** object-position for the desktop crop, e.g. "center 40%" */
  imageFocus?: string;
  /** Short line laid over the bottom of the photo */
  caption?: string;
}

/**
 * Inner-page masthead, built to the same rules as the home hero: crimson
 * ground, left aligned, heading at a size that sits below the home H1.
 *
 * Replaces a centered 6xl heading with a blurred scarlet glow behind it. That
 * treatment also split the heading into one span per word with margin-based
 * gaps, so the accessible name and any copy-paste came out with no spaces.
 * The heading is plain text again.
 *
 * With `image`, the photo runs full-bleed directly under the band so the two
 * read as one masthead rather than a header followed by an unrelated picture.
 */
export default function PageHero({
  heading,
  subtext,
  eyebrow,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  imageHeightClass = "md:h-[480px]",
  imageFocus = "center",
  caption,
}: PageHeroProps) {
  return (
    <>
      <section className="bg-crimson text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          {eyebrow && (
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/70 mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-[2.6rem] font-bold leading-[1.1] tracking-tight max-w-2xl text-balance">
            {heading}
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/80 max-w-xl">
            {subtext}
          </p>
        </div>
      </section>

      {image && (
        <figure className="relative m-0 w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt ?? ""}
            width={imageWidth}
            height={imageHeight}
            decoding="async"
            className={`w-full h-auto ${imageHeightClass} object-cover`}
            style={{ objectPosition: imageFocus }}
          />

          {/* Feather the bottom edge only. The top butts against the crimson
              band on purpose, so there is no seam between the two. */}
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg to-transparent pointer-events-none ${
              caption ? "h-24 via-bg/60" : "h-12"
            }`}
          />

          {caption && (
            <figcaption className="absolute inset-x-0 bottom-0 pointer-events-none">
              <div className="max-w-6xl mx-auto px-4 pb-5 md:pb-7">
                <p className="font-heading text-sm md:text-base font-semibold text-text max-w-xl">
                  {caption}
                </p>
              </div>
            </figcaption>
          )}
        </figure>
      )}
    </>
  );
}

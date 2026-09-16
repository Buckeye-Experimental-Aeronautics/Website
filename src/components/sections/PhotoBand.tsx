import { motion } from "framer-motion";

interface PhotoBandProps {
  src: string;
  alt: string;
  /** Short line shown over the bottom of the photo */
  caption?: string;
  /** Small uppercase label above the caption */
  eyebrow?: string;
  /** Desktop crop height. Mobile always shows the full frame uncropped. */
  heightClass?: string;
  /** object-position for the desktop crop, e.g. "center 40%" */
  focus?: string;
  /** Intrinsic pixel size, so the browser reserves space before the lazy
   *  image loads instead of shifting the page when it arrives. */
  width: number;
  height: number;
}

/**
 * Full-bleed photo with the page background feathered into the top and bottom
 * edges, so a photograph sits inside the dark layout instead of on top of it.
 *
 * Mobile keeps the image's natural aspect ratio. Cropping a wide group shot to
 * a fixed height on a narrow screen cuts people off at the edges.
 */
export default function PhotoBand({
  src,
  alt,
  caption,
  eyebrow,
  heightClass = "md:h-[420px]",
  focus = "center",
  width,
  height,
}: PhotoBandProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`w-full h-auto ${heightClass} object-cover`}
        style={{ objectPosition: focus }}
      />

      {/* Feather the page background into the photo edges */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg to-transparent pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg via-bg/70 to-transparent pointer-events-none"
      />

      {caption && (
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <div className="max-w-6xl mx-auto px-4 pb-5 md:pb-7">
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary mb-1">
                {eyebrow}
              </p>
            )}
            <p className="font-heading text-base md:text-xl font-semibold text-text max-w-2xl">
              {caption}
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
}

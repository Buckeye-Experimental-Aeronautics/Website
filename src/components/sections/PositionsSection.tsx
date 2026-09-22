import { motion } from "framer-motion";
import { POSITION_TIERS, UNIT_LABELS } from "@/lib/constants";

const viewport = { once: true, margin: "-50px" } as const;

export default function PositionsSection() {
  return (
    <section className="py-16 md:py-24 bg-surface/40 border-y border-border">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
            Club Structure
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Clear positions and a path to grow, from first-semester member to
            program leadership.
          </p>
        </motion.div>

        {/* Hierarchy pyramid */}
        <div className="flex flex-col items-center">
          {POSITION_TIERS.map((tier, i) => (
            <div key={i} className="flex flex-col items-center">
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                  aria-hidden="true"
                  className="w-px h-6 bg-primary/40 origin-top"
                />
              )}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.4,
                  delay: i * 0.12,
                  ease: "easeOut",
                }}
                className="flex flex-wrap justify-center gap-3"
              >
                {tier.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center px-5 py-2.5 surface surface-interactive font-heading text-sm font-medium text-text transition-colors duration-300 hover:border-primary/40"
                  >
                    {role}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Organizational unit labels */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="mt-10 md:mt-12 text-center"
        >
          <p className="text-xs text-muted uppercase tracking-wider mb-3">
            Work is organized through
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {UNIT_LABELS.map((label) => (
              <span
                key={label}
                className="inline-flex items-center px-4 py-1.5 rounded-sm bg-primary/10 border border-primary/25 text-sm font-medium text-primary"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

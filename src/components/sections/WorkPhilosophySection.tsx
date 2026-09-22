import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { getIcon } from "@/lib/icons";
import { WORK_PHILOSOPHY, PROCESS_STEPS } from "@/lib/constants";

const viewport = { once: true, margin: "-50px" } as const;

export default function WorkPhilosophySection() {
  return (
    <section className="py-16 md:py-24 bg-surface/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
            Our Work Philosophy
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            How we turn students into flight-ready engineers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {WORK_PHILOSOPHY.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.08,
                  ease: "easeOut",
                }}
                className="h-full"
              >
                <div className="group h-full p-6 surface transition-all duration-300 surface-interactive">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-[3px] bg-primary/10 mb-4">
                    <Icon size={30} weight="duotone" className="text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text mb-3">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-muted leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Research → Design → Test → Refine cycle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4"
        >
          {PROCESS_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-3 sm:gap-4">
              <span className="font-heading text-sm sm:text-base font-semibold uppercase tracking-widest text-text">
                {step}
              </span>
              {i < PROCESS_STEPS.length - 1 && (
                <ArrowRight
                  size={16}
                  weight="bold"
                  aria-hidden="true"
                  className="text-primary"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

export default function SponsorsFooter() {
  // TODO: Replace placeholder slots with actual sponsor logos when confirmed
  const placeholderSlots = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section className="bg-surface/50 border-t border-border py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h4 className="text-center text-sm font-semibold text-muted uppercase tracking-wider mb-8">
          Thank You to Our Sponsors
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {placeholderSlots.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="flex items-center justify-center h-20 rounded-lg bg-border/30 border border-border/50 text-xs text-muted transition-all duration-300 surface-interactive grayscale hover:grayscale-0 cursor-default"
            >
              Your Logo Here
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

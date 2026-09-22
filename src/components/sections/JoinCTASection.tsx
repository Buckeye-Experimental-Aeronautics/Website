import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function JoinCTASection() {
  return (
    <section className="py-16 md:py-24 bg-surface border-t border-b border-border relative overflow-hidden">
      {/* Subtle scarlet gradient border on top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Scarlet ambient glow */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[280px] max-w-full rounded-full bg-primary/10 blur-[110px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
          Ready to build the future of flight?
        </h2>
        <p className="text-muted max-w-xl mx-auto mb-8">
          Join one of seven specialized teams and gain hands-on engineering
          experience that goes beyond the classroom.
        </p>
        <Link
          to="/join"
          className="inline-flex h-11 px-6 items-center justify-center rounded-md bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          Join BExA
        </Link>
      </motion.div>
    </section>
  );
}

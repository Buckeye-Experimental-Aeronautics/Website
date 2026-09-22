import { motion } from "framer-motion";
import { HandHeart } from "@phosphor-icons/react";
import TierCard from "@/components/cards/TierCard";
import { SPONSOR_TIERS } from "@/lib/constants";

const viewport = { once: true, margin: "-50px" } as const;

export default function SponsorTiersSection() {
  return (
    <section className="py-16 md:py-24 bg-surface border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
            Sponsorship Tiers
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Four partnership levels to fit your organization's goals and budget.
            Each tier includes every benefit of the tiers below it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
          {SPONSOR_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="h-full"
            >
              <TierCard tier={tier} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xs text-muted mt-6 max-w-3xl mx-auto text-center leading-relaxed"
        >
          Carmen-tier naming rights: your chosen name (subject to team approval)
          is applied to a BExA aircraft and used in all flight test coverage and
          media for the season.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 p-6 surface"
        >
          <HandHeart size={36} weight="duotone" className="text-primary shrink-0" />
          <p className="text-sm text-muted leading-relaxed text-center sm:text-left">
            <span className="text-text font-medium">In-kind sponsorship:</span>{" "}
            BExA gladly accepts donations of materials, hardware, software
            licenses, and manufacturing services. In-kind contributions are
            credited at the tier matching their fair market value. Custom
            partnership packages are available. Let's talk.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

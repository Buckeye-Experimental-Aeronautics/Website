import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

export default function SponsorContactSection() {
  return (
    <section className="py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-4 text-center"
      >
        <h3 className="font-heading text-2xl md:text-3xl font-semibold text-text mb-4">
          Get in Touch
        </h3>
        <p className="text-muted mb-6 max-w-lg mx-auto">
          Your sponsorship puts jet engines in the hands of top engineering
          students, and puts your brand in front of them. Reach out
          to our Business team to start the conversation.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("BExA Sponsorship Inquiry")}`}
          className="inline-flex h-11 px-6 items-center justify-center rounded-md bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          Contact Us
        </a>
        <p className="text-sm text-muted mt-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-text/80 hover:text-primary transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors"
            aria-label="BExA on LinkedIn"
          >
            <LinkedinLogo size={22} weight="duotone" />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text transition-colors"
            aria-label="BExA on Instagram"
          >
            <InstagramLogo size={22} weight="duotone" />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-muted hover:text-text transition-colors"
            aria-label="Email BExA"
          >
            <EnvelopeSimple size={22} weight="duotone" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

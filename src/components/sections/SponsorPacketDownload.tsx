import { motion } from "framer-motion";
import { FilePdf } from "@phosphor-icons/react";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function SponsorPacketDownload() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 p-6 surface"
        >
          <FilePdf
            size={40}
            weight="duotone"
            className="text-primary shrink-0"
          />
          <p className="text-sm text-muted leading-relaxed flex-1 text-center sm:text-left">
            Want the full sponsorship packet, including payment details and
            in-kind options? Email us and we'll send the latest version
            directly.
          </p>
          {/* TODO: Replace with a direct download link once the final packet PDF is approved */}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("BExA Sponsorship Packet Request")}`}
            className="inline-flex h-10 px-5 items-center justify-center rounded-md border border-primary/40 text-primary text-sm font-medium transition-all hover:bg-primary hover:text-white active:scale-[0.98] shrink-0"
          >
            Request Packet
          </a>
        </motion.div>
      </div>
    </section>
  );
}

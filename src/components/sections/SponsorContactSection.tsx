import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

/**
 * One closing block instead of two centred ones.
 *
 * The packet request and the contact block were separate sections asking for
 * the same action twice, in the same shape, ten pixels apart. They are now two
 * panels: the packet for people who want to read before talking, the email for
 * people who are ready. Same structure as the dual CTA on the home page.
 */
export default function SponsorContactSection() {
  return (
    <section className="bg-bg pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-4">
        <div
          className="surface p-7 md:p-9 flex flex-col"
          style={{ borderRadius: "var(--radius-panel)" }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
            Read first
          </p>
          <h2 className="mt-2 font-heading text-xl md:text-2xl font-bold tracking-tight">
            Get the sponsorship packet.
          </h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Full breakdown of the program, the aircraft, and what each level
            covers. We will send it over the same day.
          </p>
          <div className="mt-auto pt-6">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "BExA Sponsorship Packet Request"
              )}`}
              className="inline-flex h-10 px-5 items-center justify-center border border-border text-sm font-semibold text-text transition-colors hover:border-muted"
              style={{ borderRadius: "var(--radius-panel)" }}
            >
              Request the packet
            </a>
          </div>
        </div>

        <div
          className="bg-crimson text-white p-7 md:p-9 flex flex-col"
          style={{ borderRadius: "var(--radius-panel)" }}
        >
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/65">
            Ready to talk
          </p>
          <h2 className="mt-2 font-heading text-xl md:text-2xl font-bold tracking-tight">
            Start the conversation.
          </h2>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Our business team handles sponsorship directly. Tell us what your
            company is looking for and we will tell you honestly whether we can
            deliver it.
          </p>
          <div className="mt-auto pt-6 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "BExA Sponsorship Inquiry"
              )}`}
              className="inline-flex h-10 px-5 items-center justify-center bg-white text-crimson text-sm font-semibold transition-colors hover:bg-white/90"
              style={{ borderRadius: "var(--radius-panel)" }}
            >
              Email us
            </a>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="BExA on LinkedIn"
              >
                <LinkedinLogo size={20} weight="duotone" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="BExA on Instagram"
              >
                <InstagramLogo size={20} weight="duotone" />
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-white/70">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import {
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import {
  NAV_LINKS,
  LEADERSHIP,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import bexaMark from "@/assets/bexa-mark.png";

export default function Footer() {
  const officers = LEADERSHIP.filter((m) => m.email);
  const advisor = LEADERSHIP.find((m) => m.title === "Advisor");

  return (
    <footer className="bg-bg border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.2fr] gap-10 md:gap-8">
          {/* Identity */}
          <div>
            <Link to="/" aria-label="BExA home" className="inline-block">
              <img
                src={bexaMark}
                alt="BExA"
                width={140}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-3 text-xs text-muted leading-relaxed">
              Buckeye Experimental Aeronautics
              <br />
              The Ohio State University
            </p>

            <div className="flex items-center mt-4 -ml-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted hover:text-text transition-colors"
                aria-label="BExA on LinkedIn"
              >
                <LinkedinLogo size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted hover:text-text transition-colors"
                aria-label="BExA on Instagram"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="p-3 text-muted hover:text-text transition-colors"
                aria-label="Email BExA"
              >
                <EnvelopeSimple size={18} />
              </a>
            </div>
          </div>

          {/* Site */}
          <nav aria-label="Footer">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted mb-3">
              Site
            </h2>
            <ul className="list-none p-0 m-0 space-y-1.5">
              {NAV_LINKS.filter((l) => !l.hidden).map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="inline-block py-0.5 text-sm text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/join"
                  className="inline-block py-0.5 text-sm text-muted hover:text-text transition-colors"
                >
                  Join
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted mb-3">
              Contact
            </h2>
            <ul className="list-none p-0 m-0 space-y-1.5">
              {officers.map((m) => (
                <li key={m.name}>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-sm text-muted hover:text-text transition-colors"
                  >
                    {m.email}
                  </a>
                </li>
              ))}
              {advisor && (
                <li className="pt-1.5 text-sm text-muted">
                  Advisor: {advisor.name}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Buckeye Experimental Aeronautics
          </p>
          <p className="text-xs text-muted/80">
            Site by{" "}
            <a
              href="https://www.linkedin.com/in/jackschwendeman/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text/70 hover:text-accent transition-colors"
            >
              Jack Schwendeman
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

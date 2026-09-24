import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/constants";
import bexaMark from "@/assets/bexa-mark.png";
import MobileMenu from "./MobileMenu";

/**
 * Crimson masthead. Solid at every scroll position rather than fading in a
 * translucent blur, so the bar is one consistent object.
 *
 * The Projects dropdown was removed: projects are reached through Program,
 * which is where the roadmap that contextualises them already lives.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const visibleLinks = NAV_LINKS.filter((l) => !l.hidden);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center bg-crimson transition-shadow duration-200 ease-out ${
          scrolled ? "shadow-[0_1px_0_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto w-full px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="BExA home">
            <img
              src={bexaMark}
              alt="BExA"
              width={110}
              height={28}
              className="h-6 w-auto brightness-0 invert"
            />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {visibleLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1 text-[13px] font-medium transition-colors duration-150 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/join"
              className="hidden md:inline-flex h-8 px-4 items-center justify-center bg-white text-crimson text-[13px] font-semibold transition-colors hover:bg-white/90"
              style={{ borderRadius: "var(--radius-panel)" }}
            >
              Join
            </Link>
            <button
              type="button"
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

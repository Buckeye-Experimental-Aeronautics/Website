import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-14">
        {children}
      </main>
      {/* SponsorsFooter removed 2026-09-22: it rendered six "Your Logo Here"
          placeholders. Real sponsors now run in the marquee on the home page. */}
      <Footer />
    </div>
  );
}

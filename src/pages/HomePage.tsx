import HeroSection from "@/components/sections/HeroSection";
import SponsorMarquee from "@/components/sections/SponsorMarquee";
import ProgramTimeline from "@/components/sections/ProgramTimeline";
import TeamsStrip from "@/components/sections/TeamsStrip";
import JetStreak from "@/components/sections/JetStreak";
import ProcessSection from "@/components/sections/ProcessSection";
import DualCTASection from "@/components/sections/DualCTASection";
import { SEO } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

export default function HomePage() {
  useSEO(SEO.home);

  return (
    <>
      <HeroSection />
      <SponsorMarquee />
      <ProgramTimeline />
      {/* The only dark-to-dark seam on the page, and the one place a divider
          has a job. Scroll-linked, so the jet travels the distance the reader
          travels: the program above, the people who build it below. */}
      <JetStreak />
      <TeamsStrip />
      <ProcessSection />
      <DualCTASection />
    </>
  );
}

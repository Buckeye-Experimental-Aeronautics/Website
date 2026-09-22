import HeroSection from "@/components/sections/HeroSection";
import SponsorMarquee from "@/components/sections/SponsorMarquee";
import ProgramTimeline from "@/components/sections/ProgramTimeline";
import TeamsStrip from "@/components/sections/TeamsStrip";
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
      <TeamsStrip />
      <ProcessSection />
      <DualCTASection />
    </>
  );
}

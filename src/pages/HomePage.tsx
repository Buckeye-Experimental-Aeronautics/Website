import HeroSection from "@/components/sections/HeroSection";
import JetStreak from "@/components/sections/JetStreak";
import PhotoBand from "@/components/sections/PhotoBand";
import teamGroupPhoto from "@/assets/team-group.jpg";
import PillarsSection from "@/components/sections/PillarsSection";
import WorkPhilosophySection from "@/components/sections/WorkPhilosophySection";
import TeamsPreviewSection from "@/components/sections/TeamsPreviewSection";
import EffortsPreviewSection from "@/components/sections/EffortsPreviewSection";
import JoinCTASection from "@/components/sections/JoinCTASection";
import { SEO } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

export default function HomePage() {
  useSEO(SEO.home);

  return (
    <>
      <HeroSection />
      <JetStreak />
      <PhotoBand
        src={teamGroupPhoto}
        alt="BExA members with the EDF test bed aircraft"
        caption="THE TEAM - AU26"
        focus="center 45%"
        width={2000}
        height={1019}
      />
      <PillarsSection />
      <WorkPhilosophySection />
      <JetStreak direction="rtl" />
      <TeamsPreviewSection />
      <JetStreak />
      <EffortsPreviewSection />
      <JoinCTASection />
    </>
  );
}

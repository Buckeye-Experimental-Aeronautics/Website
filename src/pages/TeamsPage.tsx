import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "@/components/sections/PageHero";
import TeamCardsSection from "@/components/sections/TeamCardsSection";
import PositionsSection from "@/components/sections/PositionsSection";
import PhotoBand from "@/components/sections/PhotoBand";
import memberResearchPhoto from "@/assets/member-research.jpg";
import teamGroupPhoto from "@/assets/team-group.jpg";
import JoinCTASection from "@/components/sections/JoinCTASection";
import { SEO } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

export default function TeamsPage() {
  const location = useLocation();

  useSEO(SEO.teams);

  // Scroll to hash anchor on load
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location.hash]);

  return (
    <>
      <PageHero
        eyebrow="Meet the team"
        heading="Our Teams"
        subtext="Seven specialized teams, six engineering and one business, working together to design, build, test, and fly unmanned aircraft."
        image={teamGroupPhoto}
        imageAlt="BExA members gathered with the V01 electric ducted fan test bed"
        imageWidth={2000}
        imageHeight={1019}
        imageHeightClass="md:h-[520px]"
        imageFocus="center 40%"
      />
      <TeamCardsSection />
      <PhotoBand
        src={memberResearchPhoto}
        alt="A member working through vehicle documentation and control system mapping across two monitors"
        eyebrow="How The Work Happens"
        caption="Component research, wiring definitions, and control mapping before anything gets built."
        heightClass="md:h-[460px]"
        focus="center 55%"
        width={1600}
        height={1067}
      />
      <PositionsSection />
      <JoinCTASection />
    </>
  );
}

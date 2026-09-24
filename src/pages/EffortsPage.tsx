import PageHero from "@/components/sections/PageHero";
import RoadmapTimeline from "@/components/sections/RoadmapTimeline";
import JetStreak from "@/components/sections/JetStreak";
import EffortDetailSection from "@/components/sections/EffortDetailSection";
import VisionBlock from "@/components/sections/VisionBlock";
import { SEO } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

export default function EffortsPage() {
  useSEO(SEO.efforts);

  return (
    <>
      <PageHero
        eyebrow="Flight program"
        heading="Our Efforts"
        subtext="From electric ducted fans to jet-powered transonic flight. Follow our prototype roadmap toward a Guinness World Record."
      />
      <RoadmapTimeline />
      {/* Travels right to left here, against the home page, so the two
          placements read as one aircraft on a circuit rather than a motif
          stamped twice. Marks the move from the plan to the hardware. */}
      <JetStreak direction="rtl" />
      <EffortDetailSection />
      <VisionBlock />
    </>
  );
}

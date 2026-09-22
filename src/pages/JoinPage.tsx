import PageHero from "@/components/sections/PageHero";
import WhyJoinSection from "@/components/sections/WhyJoinSection";
import WhatToExpectSection from "@/components/sections/WhatToExpectSection";
import JoinForm from "@/components/sections/JoinForm";
import { SEO } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

export default function JoinPage() {
  useSEO(SEO.join);

  return (
    <>
      <PageHero
        eyebrow="Join the team"
        heading="Build Real Aircraft Before You Graduate"
        subtext="Get hands-on aerospace engineering experience. Build real aircraft. Work with real tools. Join a team that's going for a world record."
      />
      <WhyJoinSection />
      <WhatToExpectSection />
      <JoinForm />
    </>
  );
}

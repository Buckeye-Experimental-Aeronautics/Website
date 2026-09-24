import PageHero from "@/components/sections/PageHero";
import WhySponsorSection from "@/components/sections/WhySponsorSection";
import SponsorTiersSection from "@/components/sections/SponsorTiersSection";
// SponsorPacketDownload folded into SponsorContactSection: it asked for the
// same action as the contact block, in the same shape, one section apart.
import SponsorContactSection from "@/components/sections/SponsorContactSection";
import { SEO } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

export default function SponsorPage() {
  useSEO(SEO.sponsor);

  return (
    <>
      <PageHero
        eyebrow="Sponsorship"
        heading="Partner With BExA"
        subtext="We design, build and flight-test experimental aircraft on a student budget. Sponsorship pays for the hardware, and it goes on the aircraft."
      />
      <WhySponsorSection />
      <SponsorTiersSection />
      <SponsorContactSection />
    </>
  );
}

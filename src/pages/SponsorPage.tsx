import PageHero from "@/components/sections/PageHero";
import WhySponsorSection from "@/components/sections/WhySponsorSection";
import SponsorTiersSection from "@/components/sections/SponsorTiersSection";
import SponsorPacketDownload from "@/components/sections/SponsorPacketDownload";
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
        subtext="Support the next generation of aerospace engineers. Your sponsorship fuels real flight hardware, student development, and cutting-edge research."
      />
      <WhySponsorSection />
      <SponsorTiersSection />
      <SponsorPacketDownload />
      <SponsorContactSection />
    </>
  );
}

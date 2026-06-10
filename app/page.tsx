import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Stats } from "@/components/Stats";
import { Platform } from "@/components/Platform";
import { Approach } from "@/components/Approach";
import { CtaStrip } from "@/components/CtaStrip";
import { Technologies } from "@/components/Technologies";
import { Sectors } from "@/components/Sectors";
import { WhyStatement } from "@/components/WhyStatement";
import { Security } from "@/components/Security";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Assistant } from "@/components/Assistant";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustStrip />
        <Stats />
        <Platform />
        <CtaStrip which="work" />
        <Approach />
        <Technologies />
        <Sectors />
        <WhyStatement />
        <Security />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <Assistant />
    </>
  );
}

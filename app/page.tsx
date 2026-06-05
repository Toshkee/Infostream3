import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Stats } from "@/components/Stats";
import { Products } from "@/components/Products";
import { Systems } from "@/components/Systems";
import { Approach } from "@/components/Approach";
import { Work } from "@/components/Work";
import { Technologies } from "@/components/Technologies";
import { Sectors } from "@/components/Sectors";
import { WhyStatement } from "@/components/WhyStatement";
import { Security } from "@/components/Security";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Assistant } from "@/components/Assistant";
import { BackToTop } from "@/components/BackToTop";

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
        <Products />
        <Systems />
        <Approach />
        <Work />
        <Technologies />
        <Sectors />
        <WhyStatement />
        <Security />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <Assistant />
      <BackToTop />
    </>
  );
}

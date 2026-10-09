import { site } from '@/lib/site';
import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { ChannelBar } from '@/components/sections/channel-bar';
import { Problem } from '@/components/sections/problem';
import { HowItWorks } from '@/components/sections/how-it-works';
import { ProductTourSection } from '@/components/sections/product-tour-section';
import { Safety } from '@/components/sections/safety';
import { Route } from '@/components/sections/route';
import { Integrations } from '@/components/sections/integrations';
import { SimulatorSection } from '@/components/sections/simulator-section';
import { Comparison } from '@/components/sections/comparison';
import { Demo } from '@/components/sections/demo';
import { Faq } from '@/components/sections/faq';
import { FinalCta } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';
import { MobileCtaBar } from '@/components/sections/mobile-cta-bar';
import { SectionViews } from '@/components/section-views';
import { JsonLd } from '@/components/json-ld';

export default function Home() {
  return (
    <>
      <Header appUrl={site.appUrl} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <ChannelBar />
        <Problem />
        <HowItWorks />
        <Route />
        {site.features.simulator ? <SimulatorSection /> : null}
        <ProductTourSection />
        <Safety />
        <Integrations />
        <Comparison />
        <Demo />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
      <SectionViews />
      <JsonLd />
    </>
  );
}

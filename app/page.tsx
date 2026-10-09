import { site } from '@/lib/site';
import { Header } from '@/components/sections/header';
import { Hero } from '@/components/sections/hero';
import { FinalCta } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Header appUrl={site.appUrl} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

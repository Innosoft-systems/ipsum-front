import { setRequestLocale } from 'next-intl/server';
import { AboutVideoSection } from '../_components/about-video-section';
import { GallerySection } from '../_components/gallery-section';
import { HeroSection } from '../_components/hero-section';
import { PartnersSection } from '../_components/partners-section';
import { ProcessSection } from '../_components/process-section';
import { SiteFooter } from '../_components/site-footer';
import { SiteHeader } from '../_components/site-header';
import { TrustSection } from '../_components/trust-section';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustSection />
        <AboutVideoSection />
        <ProcessSection />
        <PartnersSection />
        <GallerySection />
      </main>
      <SiteFooter />
    </>
  );
}

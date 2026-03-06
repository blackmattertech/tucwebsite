import { lazy } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { PrinciplesSection } from '../components/PrinciplesSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { BlankSection } from '../components/BlankSection';
import { ProductsSection } from '../components/ProductsSection';
import { TrustSection } from '../components/TrustSection';
import { LazySection } from '../components/LazySection';

const ProductCarouselSection = lazy(() =>
  import('../components/ProductCarouselSection').then((m) => ({ default: m.ProductCarouselSection }))
);
const ManufacturingStrengthSection = lazy(() =>
  import('../components/ManufacturingStrengthSection').then((m) => ({ default: m.ManufacturingStrengthSection }))
);
const GoogleReviewsSection = lazy(() =>
  import('../components/GoogleReviewsSection').then((m) => ({ default: m.GoogleReviewsSection }))
);
const BlogSection = lazy(() =>
  import('../components/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const SocialMediaSection = lazy(() =>
  import('../components/SocialMediaSection').then((m) => ({ default: m.SocialMediaSection }))
);
const ContactCTASection = lazy(() =>
  import('../components/ContactCTASection').then((m) => ({ default: m.ContactCTASection }))
);

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PrinciplesSection />
      <TrustSection />
      <CapabilitiesSection />
      <BlankSection />
      <ProductsSection />
      <LazySection>
        <ProductCarouselSection />
      </LazySection>
      <LazySection>
        <ManufacturingStrengthSection />
      </LazySection>
      <LazySection>
        <GoogleReviewsSection />
      </LazySection>
      <LazySection>
        <BlogSection />
      </LazySection>
      <LazySection>
        <SocialMediaSection />
      </LazySection>
      <LazySection>
        <ContactCTASection />
      </LazySection>
    </>
  );
}
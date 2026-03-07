import { lazy } from 'react';
import { HeroSection } from '../components/HeroSection';
import { BlankSection } from '../components/BlankSection';
import { ProductsSection } from '../components/ProductsSection';
import { TrustSection } from '../components/TrustSection';
import { TagFactorSection } from '../components/TagFactorSection';
import { LazySection } from '../components/LazySection';

const PrinciplesSection = lazy(() =>
  import('../components/PrinciplesSection').then((m) => ({ default: m.PrinciplesSection }))
);
const CapabilitiesSection = lazy(() =>
  import('../components/CapabilitiesSection').then((m) => ({ default: m.CapabilitiesSection }))
);
const ProductCarouselSection = lazy(() =>
  import('../components/ProductCarouselSection').then((m) => ({ default: m.ProductCarouselSection }))
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
const AboutSection = lazy(() =>
  import('../components/AboutSection').then((m) => ({ default: m.AboutSection }))
);

export function Home() {
  return (
    <>
      <HeroSection />
      <LazySection minHeightClass="min-h-[55vh]">
        <AboutSection />
      </LazySection>
      <LazySection minHeightClass="min-h-[50vh]">
        <PrinciplesSection />
      </LazySection>
      <TrustSection />
      <div
        className="dotted-bg-wrap"
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage: 'radial-gradient(circle at center, #AAAAEE 0, #AAAAEE 1px, transparent 1px)',
          backgroundSize: '12px 12px',
        }}
      >
        <LazySection minHeightClass="min-h-[50vh]">
          <CapabilitiesSection />
        </LazySection>
        <BlankSection />
        <ProductsSection />
      </div>
      <LazySection minHeightClass="min-h-[520px]">
        <ProductCarouselSection />
      </LazySection>
      <TagFactorSection />
      <LazySection minHeightClass="min-h-[420px]">
        <GoogleReviewsSection />
      </LazySection>
      <LazySection minHeightClass="min-h-[480px]">
        <BlogSection />
      </LazySection>
      <LazySection minHeightClass="min-h-[320px]">
        <SocialMediaSection />
      </LazySection>
      <LazySection minHeightClass="min-h-[360px]">
        <ContactCTASection />
      </LazySection>
    </>
  );
}
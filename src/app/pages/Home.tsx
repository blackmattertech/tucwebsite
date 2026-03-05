import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { PrinciplesSection } from '../components/PrinciplesSection';
import { CapabilitiesSection } from '../components/CapabilitiesSection';
import { BlankSection } from '../components/BlankSection';
import { ProductsSection } from '../components/ProductsSection';
import { ProductCarouselSection } from '../components/ProductCarouselSection';
import { ManufacturingStrengthSection } from '../components/ManufacturingStrengthSection';
import { TrustSection } from '../components/TrustSection';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { BlogSection } from '../components/BlogSection';
import { SocialMediaSection } from '../components/SocialMediaSection';
import { ContactCTASection } from '../components/ContactCTASection';

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
      <ProductCarouselSection />
      <ManufacturingStrengthSection />
      <GoogleReviewsSection />
      <BlogSection />
      <SocialMediaSection />
      <ContactCTASection />
    </>
  );
}
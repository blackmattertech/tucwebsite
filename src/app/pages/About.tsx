import { useEffect, useRef, useMemo, useState } from 'react';
import { AboutBanner } from '../components/AboutBanner';
import { JourneySection } from '../components/JourneySection';
import { ProductionIntelligenceLeft } from '../components/ProductionIntelligenceLeft';
import { ContactCTASection } from '../components/ContactCTASection';
import { MapFaqSection } from '../components/MapFaqSection';
import { StatsCards } from '../components/StatsCards';
import { clientLogos } from '../../data/client-logos';
import { clientLogoUrl } from '../lib/imagekitStorage';
import { useMediaAssets } from '../lib/useMediaAssets';
import './About.css';

/** Alt text for client logos (matches ClienteleSection). */
function logoAlt(filename: string): string {
  const known: Record<string, string> = {
    '1024px-Cisco_logo.svg_.png': 'Cisco',
    '98b4e8_d71ea6626990460c8891b856b61618bamv2.webp': 'Client',
    'Acc_Logo_Black_Purple_RGB.png': 'Accenture',
    'Bank_of_Baroda_logo-3.svg': 'Bank of Baroda',
    'Tesco_Logo.svg_.png': 'Tesco',
    'Zomato-Logo.png': 'Zomato',
    'basf_logo.svg': 'BASF',
    'download-17.png': 'Client',
    'huawei_  logo.svg': 'Huawei',
    "john_deere logo.svg": "John Deere",
    "kellogg's_logo.svg": "Kellogg's",
    'kfc_logo.svg': 'KFC',
    'philips_logo.svg': 'Philips',
    'pwc_logo.svg': 'PwC',
    'red_bull logo.svg': 'Red Bull',
  };
  if (known[filename]) return known[filename];
  const base = filename.replace(/\.[^.]+$/, '').replace(/[_\-]+/g, ' ').replace(/\s*logo\s*$/i, '').trim();
  return base.length > 2 && base.length < 50 ? base : 'Client';
}

/* Factory/production imagery – replace with your own assets as needed */
const IMG = {
  factoryWide:
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  designSamples:
    'https://images.unsplash.com/photo-1558171813-4c088753af8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  patternMaking:
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  garmentSampling:
    'https://images.unsplash.com/photo-1558171813-4c088753af8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  tailorsStitching:
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  screenPrinting:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  embroidery:
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  fabricCutting:
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  factoryFloor:
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  erpManager:
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  workersSewing:
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
};

/** Intro video – ImageKit (Welcome To Tag Unlimited) */
const INTRO_VIDEO_SRC =
  'https://ik.imagekit.io/tagunlimited/YTDown.com_YouTube_Welcome-To-Tag-Unlimited_Media_tZJ2DsbGkzE_002_720p.mp4';

export function About() {
  const introSectionRef = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const [introVideoInView, setIntroVideoInView] = useState(false);
  const { getUrl, getFileNamesByFolder } = useMediaAssets();
  const mediaLogos = getFileNamesByFolder('client-logos');
  const brandsLogos = mediaLogos.length > 0 ? mediaLogos : clientLogos;
  const mid = Math.ceil(brandsLogos.length / 2);
  const brandsRow1 = brandsLogos.slice(0, mid);
  const brandsRow2 = brandsLogos.slice(mid);
  const getLogoUrl = (name: string) =>
    mediaLogos.length > 0 ? getUrl('client-logos', name) : clientLogoUrl(name);

  useEffect(() => {
    const section = introSectionRef.current;
    if (!section) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (cancelled) return;
        if (entries[0]?.isIntersecting) setIntroVideoInView(true);
      },
      { rootMargin: '100px', threshold: 0.01 }
    );
    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = introSectionRef.current;
    const video = introVideoRef.current;
    if (!section || !video || !introVideoInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25, rootMargin: '0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [introVideoInView]);

  return (
    <>
      {/* 1. Hero – keep as is */}
      <AboutBanner />

      {/* 2. Company Introduction (About Tag Unlimited) – full width, larger video */}
      <section
        ref={introSectionRef}
        className="about-intro-section py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="about-intro-section-inner px-4 sm:px-6 lg:px-12">
          <div className="about-intro-grid grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 sm:gap-10 lg:gap-16">
            <div className="about-intro-text">
              <h2 className="about-section-heading about-intro-heading">About Tag Unlimited</h2>
              <p>
                Founded in 2006 by Mr. Rahul M Singh, Tag Unlimited is a Bangalore-based
                apparel manufacturing company specializing in private label clothing and bulk
                garment production for fashion brands, startups, and businesses worldwide.
              </p>
              <p>
                With nearly two decades of experience in the garment industry, Tag Unlimited has
                established itself as a reliable apparel manufacturer in India, delivering
                high-quality garments with consistent production standards and dependable
                delivery timelines.
              </p>
              <p>
                Our manufacturing facility in Bangalore, India, is designed to support scalable
                apparel manufacturing, combining modern industrial sewing machines, advanced
                garment printing technologies, embroidery capabilities, and skilled production
                teams.
              </p>
              <p>
                From T-shirts, hoodies, shirts, jackets, and caps to custom apparel and
                promotional garments, we help brands transform their concepts into
                production-ready collections through structured workflows and efficient
                manufacturing processes.
              </p>
              <p>
                What makes Tag Unlimited different is our technology-driven production system,
                powered by ERP-enabled manufacturing workflows that track every stage of an
                order—from product development and sampling to bulk production and final
                dispatch. This ensures transparency, efficient production planning, and reliable
                delivery timelines for our clients.
              </p>
              <p>
                Today, Tag Unlimited works with fashion brands, clothing startups, corporate
                buyers, and international apparel businesses, providing flexible and scalable
                garment manufacturing solutions built on quality, efficiency, and long-term
                partnership.
              </p>
            </div>
            <div className="about-intro-video-wrap">
              {INTRO_VIDEO_SRC ? (
                <video
                  ref={introVideoRef}
                  src={introVideoInView ? INTRO_VIDEO_SRC : undefined}
                  title="About Tag Unlimited – apparel manufacturer Bangalore"
                  controls
                  playsInline
                  preload="metadata"
                  muted
                  loop
                  width={1280}
                  height={720}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <span style={{ color: '#666', fontSize: '0.875rem' }}>
                  Video link will be added here
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who We Are */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="about-who-grid grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            <div className="min-w-0">
              <h2 className="about-section-heading">Who We Are</h2>
              <div className="about-section-body max-w-3xl">
                <p>
                  Tag Unlimited is a private label apparel manufacturer in India specializing in bulk
                  garment production of T-shirts, hoodies, shirts, jackets, caps, and custom apparel for
                  fashion brands, startups, and businesses worldwide.
                </p>
                <p>
                  Our production facility in Bangalore, India is designed to support scalable apparel
                  manufacturing, enabling brands to grow without concerns about production capacity,
                  consistent garment quality, or reliable delivery timelines.
                </p>
                <p>
                  With a strong focus on structured manufacturing workflows, modern industrial sewing
                  machines, and skilled production teams, we produce garments that meet both design
                  expectations and international apparel quality standards.
                </p>
                <p>
                  From product development and garment sampling to bulk apparel production and final
                  dispatch, every order follows a well-defined manufacturing process supported by our
                  ERP-driven production management system.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://ik.imagekit.io/tagunlimited/Indian%20apparel%20manufacturing%20factory%20in%20Bangalore%20with%20tailors%20stitching%20garments%20and%20fabric%20rolls%20_%20TAG%20Unlimited%20private%20label%20apparel%20manufacturer?updatedAt=1773079732034"
                alt="Indian apparel manufacturing factory in Bangalore with tailors stitching garments and fabric rolls – Tag Unlimited private label apparel manufacturer"
                className="w-full h-auto object-cover"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Journey – thread stitch timeline */}
      <JourneySection />

      {/* 5. Infrastructure & Facility – mobile: interleaved (p1, img1, p2, img2, p3, img3, p4); desktop: text left, image stack right (reverted) */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Mobile only: interleaved paragraphs and images */}
          <div className="about-infrastructure-grid about-infrastructure-mobile lg:hidden">
            <h2 className="about-section-heading">Infrastructure</h2>
            <div className="about-section-body about-infrastructure-text">
              <p>
                Tag Unlimited operates a professionally managed apparel manufacturing facility in
                Bangalore, India, built to support large-scale private label clothing production and
                bulk garment manufacturing for fashion brands, startups, and global apparel businesses.
              </p>
            </div>
            <div className="about-infrastructure-stack__slot">
              <img
                src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20garment%20factory%20i%20india.webp"
                alt="Best garment factory in India – Tag Unlimited facility"
                width={800}
                height={400}
              />
            </div>
            <div className="about-section-body about-infrastructure-text">
              <p>
                Our production infrastructure includes modern industrial sewing machines, advanced
                screen and DTF printing systems, multi-head embroidery machines, fabric cutting
                tables, and organized production lines designed for efficient and scalable apparel
                manufacturing. Every stage of production—from fabric inspection and pattern
                development to garment stitching, branding, finishing, and packing—is structured to
                maintain consistent quality and streamlined workflows.
              </p>
            </div>
            <div className="about-infrastructure-stack__slot">
              <img
                src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20hoodie%20manufacturer%20in%20bangalore.webp"
                alt="Best hoodie manufacturer in Bangalore"
                width={800}
                height={400}
              />
            </div>
            <div className="about-section-body about-infrastructure-text">
              <p>
                With continuously expanding production capacity, experienced manufacturing teams, and
                technology-supported production management systems, our facility is capable of
                handling high-volume apparel orders while maintaining strict quality control,
                manufacturing precision, and reliable delivery timelines for domestic and
                international clients.
              </p>
            </div>
            <div className="about-infrastructure-stack__slot">
              <img
                src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20apparel%20manufacturer%20in%20india.webp"
                alt="Best apparel manufacturer in India"
                width={800}
                height={400}
              />
            </div>
            <div className="about-section-body about-infrastructure-text">
              <p>
                This robust infrastructure enables Tag Unlimited to function as a dependable apparel
                manufacturing partner for fashion brands looking for scalable, high-quality garment
                production in India.
              </p>
            </div>
          </div>

          {/* Desktop only: text left, image stack right (original layout) */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 lg:items-stretch about-infrastructure-grid-desktop">
            <div className="min-w-0">
              <h2 className="about-section-heading">Infrastructure</h2>
              <div className="about-section-body">
                <p>
                  Tag Unlimited operates a professionally managed apparel manufacturing facility in
                  Bangalore, India, built to support large-scale private label clothing production and
                  bulk garment manufacturing for fashion brands, startups, and global apparel businesses.
                </p>
                <p>
                  Our production infrastructure includes modern industrial sewing machines, advanced
                  screen and DTF printing systems, multi-head embroidery machines, fabric cutting
                  tables, and organized production lines designed for efficient and scalable apparel
                  manufacturing. Every stage of production—from fabric inspection and pattern
                  development to garment stitching, branding, finishing, and packing—is structured to
                  maintain consistent quality and streamlined workflows.
                </p>
                <p>
                  With continuously expanding production capacity, experienced manufacturing teams, and
                  technology-supported production management systems, our facility is capable of
                  handling high-volume apparel orders while maintaining strict quality control,
                  manufacturing precision, and reliable delivery timelines for domestic and
                  international clients.
                </p>
                <p>
                  This robust infrastructure enables Tag Unlimited to function as a dependable apparel
                  manufacturing partner for fashion brands looking for scalable, high-quality garment
                  production in India.
                </p>
              </div>
            </div>
            <div className="about-infrastructure-stack">
              <div className="about-infrastructure-stack__slot">
                <img
                  src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20garment%20factory%20i%20india.webp"
                  alt="Best garment factory in India – Tag Unlimited facility"
                  width={800}
                  height={400}
                />
              </div>
              <div className="about-infrastructure-stack__slot">
                <img
                  src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20hoodie%20manufacturer%20in%20bangalore.webp"
                  alt="Best hoodie manufacturer in Bangalore"
                  width={800}
                  height={400}
                />
              </div>
              <div className="about-infrastructure-stack__slot">
                <img
                  src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20apparel%20manufacturer%20in%20india.webp"
                  alt="Best apparel manufacturer in India"
                  width={800}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Technology-Driven Apparel Manufacturing – full width, minimal padding, equal column height */}
      <section className="about-technology-section">
        <div className="about-technology-section__inner">
          <div className="about-technology-section__grid">
            <div className="about-technology-images order-2 lg:order-1">
              <ProductionIntelligenceLeft />
            </div>
            <div className="about-technology-content order-1 lg:order-2">
              <h2 className="about-section-heading">Technology-Driven Apparel<br />Manufacturing</h2>
              <div className="about-section-body">
                <p>
                  At Tag Unlimited, our manufacturing operations are powered by ERP-driven
                  production management systems designed to bring transparency, efficiency, and
                  control to every stage of apparel manufacturing. From product development and
                  garment sampling to bulk production, quality inspection, and final dispatch,
                  every order is monitored through our integrated digital production workflows.
                </p>
                <p>
                  This technology-enabled manufacturing system allows our team to track real-time
                  production progress, optimize manufacturing schedules, and maintain structured
                  production timelines across large garment orders.
                </p>
                <p>Our ERP-supported manufacturing process enables:</p>
                <ul className="about-list-yellow-bullets">
                  <li>Transparent order tracking for fashion brands and buyers</li>
                  <li>Improved production planning and resource management</li>
                  <li>Reliable on-time delivery for bulk garment orders</li>
                  <li>Streamlined communication between production teams and clients</li>
                </ul>
                <p>
                  By combining over 20 years of garment manufacturing experience, skilled
                  production teams, and technology-driven production management, Tag Unlimited
                  delivers scalable, reliable, and high-quality apparel manufacturing solutions
                  for fashion brands, startups, and global businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Brands & Businesses We Serve – 2 columns: left = copy, right = logos, full width */}
      <section className="about-brands-section" aria-labelledby="brands-heading">
        <div className="about-brands-section__inner">
          <div className="about-brands-section__grid">
            <div className="about-brands-content">
              <h2 id="brands-heading" className="about-section-heading">Brands & Businesses We Serve</h2>
              <div className="about-section-body">
                <p>
                  Tag Unlimited partners with fashion brands, startups, and global apparel businesses looking for reliable private label clothing manufacturing and bulk garment production.
                </p>
                <p>Our manufacturing facility in Bangalore supports a diverse range of clients, including:</p>
                <ul>
                  <li>Fashion & Apparel Brands</li>
                  <li>Clothing Startups & D2C Labels</li>
                  <li>Corporate Apparel Buyers</li>
                  <li>Promotional Merchandise Companies</li>
                  <li>International Apparel Importers & Distributors</li>
                </ul>
                <p>
                  With scalable production capacity and flexible manufacturing workflows, we support both emerging fashion brands and large-scale apparel programs requiring consistent quality and reliable delivery timelines.
                </p>
              </div>
            </div>
            <div className="about-brands-logos-col">
              <p className="about-brands-trust-label">Trusted Manufacturing Partner For</p>
              <div className="about-brands-marquee-wrap">
                <div className="about-brands-marquee-track about-brands-marquee-track--left" aria-hidden>
                  <div className="about-brands-marquee-inner about-brands-marquee-inner--left">
                    {[...brandsRow1, ...brandsRow1].map((filename: string, i: number) => (
                      <div key={`${filename}-${i}`} className="about-brands-logo-item">
                        <img
                          src={getLogoUrl(filename)}
                          alt={logoAlt(filename)}
                          className="about-brands-logo-img"
                          width={100}
                          height={40}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="about-brands-marquee-track about-brands-marquee-track--right" aria-hidden>
                  <div className="about-brands-marquee-inner about-brands-marquee-inner--right">
                    {[...brandsRow2, ...brandsRow2].map((filename: string, i: number) => (
                      <div key={`${filename}-${i}`} className="about-brands-logo-item">
                        <img
                          src={getLogoUrl(filename)}
                          alt={logoAlt(filename)}
                          className="about-brands-logo-img"
                          width={100}
                          height={40}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="about-brands-trust-line">
                Trusted by growing fashion brands, apparel startups, and global clothing businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Quality Customisation – banner, logo yellow, centered */}
      <section className="about-quality-banner">
        <div className="about-quality-banner__inner">
          <h2 className="about-quality-banner__heading">Quality & Consistency</h2>
          <div className="about-quality-banner__body">
            <p>
              Quality is at the core of our manufacturing process. Each garment undergoes multiple
              inspection stages including fabric checking, stitching inspection, and final quality
              control before dispatch.
            </p>
            <p>
              Our structured production workflows ensure that every product meets design
              specifications, durability requirements, and consistent finishing standards.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Why Tag Unlimited – light yellow background, navy heading + navy stat cards */}
      <section className="about-why-section">
        <div className="about-why-section__inner">
          <h2 className="about-why-section__heading">Why Tag Unlimited?</h2>
          <StatsCards cardBgColor="#0f172a" className="about-why-section__stats" />
        </div>
      </section>

      {/* 12. Ready for Customisation – above Map + FAQ on About only */}
      <ContactCTASection />

      {/* 13. Map + FAQ – About page only */}
      <MapFaqSection />
    </>
  );
}

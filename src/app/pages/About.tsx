import { useEffect, useRef } from 'react';
import { AboutBanner } from '../components/AboutBanner';
import { CTASection } from '../components/CTASection';
import { JourneySection } from '../components/JourneySection';
import './About.css';

/* Factory/production imagery – replace with your own assets as needed */
const IMG = {
  factoryWide:
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  designSamples:
    'https://images.unsplash.com/photo-1558171813-4c088753af8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
  fabricInspection:
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
  gallery: [
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    'https://images.unsplash.com/photo-1558171813-4c088753af8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1000',
  ],
};

/** Intro video – ImageKit (Welcome To Tag Unlimited) */
const INTRO_VIDEO_SRC =
  'https://ik.imagekit.io/tagunlimited/YTDown.com_YouTube_Welcome-To-Tag-Unlimited_Media_tZJ2DsbGkzE_002_720p.mp4';

export function About() {
  const introSectionRef = useRef<HTMLElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = introSectionRef.current;
    const video = introVideoRef.current;
    if (!section || !video) return;

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
  }, []);

  return (
    <>
      {/* 1. Hero – keep as is */}
      <AboutBanner />

      {/* 2. Company Introduction (About TAG Unlimited) – full width, larger video */}
      <section
        ref={introSectionRef}
        className="about-intro-section py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
      >
        <div className="about-intro-section-inner px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 sm:gap-10 lg:gap-16 items-center">
            <div className="about-intro-text">
              <h2 className="about-section-heading about-intro-heading">About TAG Unlimited</h2>
              <p>
                Founded in 2006 by Mr. Rahul M Singh, TAG Unlimited is a Bangalore-based
                apparel manufacturing company specializing in private label clothing and bulk
                garment production for fashion brands, startups, and businesses worldwide.
              </p>
              <p>
                With nearly two decades of experience in the garment industry, TAG Unlimited has
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
                What makes TAG Unlimited different is our technology-driven production system,
                powered by ERP-enabled manufacturing workflows that track every stage of an
                order—from product development and sampling to bulk production and final
                dispatch. This ensures transparency, efficient production planning, and reliable
                delivery timelines for our clients.
              </p>
              <p>
                Today, TAG Unlimited works with fashion brands, clothing startups, corporate
                buyers, and international apparel businesses, providing flexible and scalable
                garment manufacturing solutions built on quality, efficiency, and long-term
                partnership.
              </p>
            </div>
            <div className="about-intro-video-wrap">
              {INTRO_VIDEO_SRC ? (
                <video
                  ref={introVideoRef}
                  src={INTRO_VIDEO_SRC}
                  title="About TAG Unlimited – apparel manufacturer Bangalore"
                  controls
                  playsInline
                  preload="metadata"
                  muted
                  loop
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="about-section-heading">Who We Are</h2>
              <div className="about-section-body max-w-3xl">
                <p>
                  TAG Unlimited is a private label apparel manufacturer in India specializing in bulk
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
                alt="Indian apparel manufacturing factory in Bangalore with tailors stitching garments and fabric rolls – TAG Unlimited private label apparel manufacturer"
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

      {/* 5. Manufacturing Strength */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="about-section-heading">Our Manufacturing Capabilities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
            <div className="about-section-body">
              <p>
                Our facility is equipped with modern production infrastructure designed for
                high-volume garment manufacturing.
              </p>
              <p>Key capabilities include:</p>
              <ul>
                <li>Industrial garment stitching lines</li>
                <li>Screen printing and DTF printing</li>
                <li>Embroidery and branding</li>
                <li>Fabric cutting and pattern development</li>
                <li>Quality inspection and finishing</li>
              </ul>
              <p>
                This integrated setup allows us to maintain quality control, faster turnaround
                times, and reliable production capacity for bulk apparel orders.
              </p>
            </div>
            <div className="about-image-grid size-4">
              <img src={IMG.tailorsStitching} alt="Tailors stitching garments" width={1200} height={800} />
              <img src={IMG.screenPrinting} alt="Screen printing" width={1200} height={800} />
              <img src={IMG.embroidery} alt="Embroidery machine" width={1200} height={800} />
              <img src={IMG.fabricCutting} alt="Fabric cutting table" width={1200} height={800} />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Infrastructure & Facility */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="about-section-heading">Infrastructure & Production Facility</h2>
          <div className="about-section-body max-w-3xl mb-10">
            <p>
              Our production facility includes modern industrial sewing machines, advanced printing
              equipment, embroidery machines, and structured production lines designed to handle
              bulk garment manufacturing.
            </p>
            <p>
              With a growing infrastructure and dedicated production teams, we are capable of
              managing large order volumes while maintaining consistent quality standards.
            </p>
          </div>
          <div className="about-image-grid size-4">
            <img src={IMG.factoryFloor} alt="Factory floor – garment manufacturer Bangalore" width={1200} height={800} />
            <img src={IMG.tailorsStitching} alt="Production machines" width={1200} height={800} />
            <img src={IMG.fabricInspection} alt="Fabric racks" width={1200} height={800} />
            <img src={IMG.factoryWide} alt="Production lines" width={1200} height={800} />
          </div>
        </div>
      </section>

      {/* 7. ERP Powered Manufacturing */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="about-section-heading">Technology Driven Manufacturing</h2>
              <div className="about-section-body">
                <p>
                  Our manufacturing operations are supported by ERP-based production management
                  systems that allow us to track every order stage — from sampling to dispatch.
                </p>
                <p>This digital production monitoring ensures:</p>
                <ul>
                  <li>Transparent order tracking</li>
                  <li>Better production planning</li>
                  <li>On-time delivery timelines</li>
                  <li>Efficient communication with clients</li>
                </ul>
                <p>
                  By combining technology and skilled manufacturing teams, we deliver reliable
                  and scalable apparel production solutions.
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img
                src={IMG.erpManager}
                alt="Factory manager with production dashboard – ERP powered apparel manufacturing"
                className="w-full h-full object-cover"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Brands & Businesses We Serve */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="about-section-heading">Brands & Businesses We Serve</h2>
          <div className="about-section-body max-w-3xl">
            <p>
              TAG Unlimited works with a wide range of clients including:
            </p>
            <ul>
              <li>Fashion brands</li>
              <li>Clothing startups</li>
              <li>Corporate apparel buyers</li>
              <li>Promotional merchandise companies</li>
              <li>International apparel importers</li>
            </ul>
            <p>
              Our flexible production capabilities allow us to support both growing brands and
              large-scale apparel programs.
            </p>
          </div>
        </div>
      </section>

      {/* 9. Quality Commitment */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="about-section-heading">Quality & Consistency</h2>
          <div className="about-section-body max-w-3xl">
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

      {/* 10. Our Team */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="about-section-heading">Our Production Team</h2>
              <div className="about-section-body">
                <p>
                  Behind every garment produced at TAG Unlimited is a team of skilled designers,
                  technicians, and production professionals dedicated to delivering quality
                  apparel.
                </p>
                <p>
                  Our experienced workforce ensures precision at every stage of the manufacturing
                  process.
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded overflow-hidden">
              <img
                src={IMG.workersSewing}
                alt="Workers sewing garments – TAG Unlimited production team"
                className="w-full h-full object-cover"
                width={1200}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Factory Gallery */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="about-section-heading">Factory Gallery</h2>
          <div className="about-gallery">
            {IMG.gallery.map((src, i) => (
              <div key={i} className="about-gallery-item rounded overflow-hidden">
                <img
                  src={src}
                  alt={`Factory and production facility – garment manufacturer Bangalore ${i + 1}`}
                  width={1000}
                  height={700}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <CTASection
        title="Looking for a Reliable Apparel Manufacturing Partner?"
        description="Partner with TAG Unlimited for scalable apparel manufacturing, consistent quality, and dependable delivery timelines."
        buttonText="Get a Manufacturing Quote"
        buttonLink="/contact-apparel-manufacturer-bangalore"
      />
    </>
  );
}

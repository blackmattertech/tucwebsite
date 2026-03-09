import { AboutBanner } from '../components/AboutBanner';
import { CTASection } from '../components/CTASection';
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

const JOURNEY = [
  { year: '2005', text: 'Started garment manufacturing' },
  { year: '2010', text: 'Expanded production capacity' },
  { year: '2016', text: 'Introduced modern industrial machines' },
  { year: '2020', text: 'ERP-based production system' },
  { year: '2024', text: 'Serving brands globally' },
];

export function About() {
  return (
    <>
      {/* 1. Hero – keep as is */}
      <AboutBanner />

      {/* 2. Company Introduction (About TAG Unlimited) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h2 className="about-section-heading">About TAG Unlimited</h2>
              <p className="about-intro-subheading">
                A trusted apparel manufacturer in Bangalore, India, specializing in private label
                clothing, bulk garment production, and custom apparel manufacturing for global
                fashion brands.
              </p>
              <p className="about-intro-seo">
                TAG Unlimited is a Bangalore-based apparel manufacturing company focused on
                delivering high-quality garments for fashion brands, startups, and corporate buyers
                worldwide. Our manufacturing facility combines modern industrial machines, skilled
                production teams, and ERP-driven workflows to ensure consistent quality and reliable
                delivery timelines.
              </p>
            </div>
            <div className="aspect-[16/9] lg:aspect-[2/1] rounded overflow-hidden">
              <img
                src={IMG.factoryWide}
                alt="Large garment factory floor with tailors and fabric – apparel manufacturer Bangalore"
                className="w-full h-full object-cover"
                width={1920}
                height={900}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Who We Are */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="about-section-heading">Who We Are</h2>
          <div className="about-section-body max-w-3xl mb-10">
            <p>
              TAG Unlimited is a private label apparel manufacturer in India specializing in bulk
              production of T-shirts, hoodies, shirts, jackets, caps, and custom garments for
              fashion brands and businesses.
            </p>
            <p>
              Our production facility is designed to support scalable garment manufacturing,
              allowing brands to grow without worrying about production capacity, quality
              consistency, or delivery timelines.
            </p>
            <p>
              With a strong focus on structured workflows, modern industrial equipment, and
              experienced production teams, we deliver garments that meet both design expectations
              and international quality standards.
            </p>
            <p>
              From product development and sampling to bulk production and final dispatch, every
              order follows a well-defined manufacturing process supported by our integrated
              production management systems.
            </p>
          </div>
          <div className="about-image-grid size-4">
            <img src={IMG.designSamples} alt="Designers developing garment samples" width={1200} height={800} />
            <img src={IMG.fabricInspection} alt="Fabric inspection" width={1200} height={800} />
            <img src={IMG.patternMaking} alt="Pattern making (CAD)" width={1200} height={800} />
            <img src={IMG.garmentSampling} alt="Garment sampling" width={1200} height={800} />
          </div>
        </div>
      </section>

      {/* 4. Our Journey */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="about-section-heading">Our Journey</h2>
          <div className="about-section-body max-w-2xl">
            <p>
              TAG Unlimited began with a vision to build a reliable apparel manufacturing partner
              for fashion brands and businesses.
            </p>
            <p>
              Over the years, we have expanded our manufacturing capabilities, invested in modern
              industrial machinery, and built a skilled production team capable of handling
              large-scale garment manufacturing projects.
            </p>
            <p>
              Today, we support brands, startups, and corporate buyers across India and
              international markets, helping them bring their apparel collections to life with
              efficient production and consistent quality.
            </p>
          </div>
          <ul className="about-timeline">
            {JOURNEY.map((item) => (
              <li key={item.year}>
                <span className="about-timeline-year">{item.year}</span>
                <span className="about-timeline-text">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Manufacturing Strength */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="about-section-heading">Our Manufacturing Capabilities</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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

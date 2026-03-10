import { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';
import { PageHero } from '../components/PageHero';
import './Capabilities.css';

const STAT_CARDS = [
  {
    target: 50000,
    suffix: '+',
    label: 'Sqft Factory',
    image: 'https://ik.imagekit.io/tagunlimited/polo-tshirt-manufacturer-cap-manufacturer-hoodie-manufacturer.webp',
    grayscale: true,
  },
  {
    target: 200,
    suffix: '+',
    label: 'Industrial Stitching Machines',
    image: 'https://ik.imagekit.io/tagunlimited/garment-stitching-floor-bangalore.webp',
    grayscale: false,
  },
  {
    target: 500000,
    suffix: '+',
    label: 'Garments stitched Every month',
    image: 'https://ik.imagekit.io/tagunlimited/tshirt%20manufacturing%20in%20bangalore%20india.webp',
    grayscale: true,
  },
  {
    target: 300,
    suffix: '+',
    label: 'Team',
    image: 'https://ik.imagekit.io/tagunlimited/infrastructure/best%20garment%20factory%20i%20india.webp',
    grayscale: true,
  },
];

function AnimatedStat({ target, suffix, inView, delay }: { target: number; suffix: string; inView: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const duration = 1800;
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    setCount(0);
    let rafId: number;
    let cancelled = false;
    const tick = (timestamp: number) => {
      if (cancelled) return;
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [started, target]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function Capabilities() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  const qualitySystems = [
    'ISO 9001:2015 Certified',
    'Multi-stage quality inspection',
    'Fabric testing laboratory',
    'Final product audit',
    'Defect tracking system',
    'Quality assurance team'
  ];

  return (
    <>
      <PageHero
        title="Seamless Apparel Manufacturing from Concept to Delivery"
        subtitle="End-to-end manufacturing solutions for private label clothing and knitwear production"
        backgroundImage="https://ik.imagekit.io/tagunlimited/garment-stitching-floor-bangalore.webp"
        imageAlt="Bulk hoodie manufacturing production line in Bangalore apparel factory"
        sectionClassName="min-h-[55vh] lg:min-h-[65vh]"
        imageLoading="lazy"
        headingClassName="capabilities-hero-heading"
        subtitleClassName="capabilities-hero-subtitle"
      />

      {/* Manufacturing Overview – same big heading style as page hero, center-aligned */}
      <section className="pt-24 pb-6 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="capabilities-section-heading capabilities-overview-heading-80">
            Manufacturing Overview
          </h2>
        </div>
      </section>

      {/* Stat cards – full background image, thick heading, smooth counter */}
      <section className="pt-6 pb-12 lg:pb-16 bg-white" aria-label="Manufacturing stats">
        <div ref={statsRef} className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {STAT_CARDS.map((card, i) => (
              <div
                key={card.label}
                className="capabilities-stat-card relative overflow-hidden rounded-xl min-h-[140px] sm:min-h-[180px] lg:min-h-[220px] flex flex-col justify-end p-4 sm:p-5 lg:p-6"
              >
                <div
                  className={`absolute inset-0 rounded-xl ${card.grayscale ? 'capabilities-stat-card-bg-grayscale' : ''}`}
                  style={{ backgroundImage: `url(${card.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  aria-hidden
                />
                <div className="capabilities-stat-card-overlay absolute inset-0 rounded-xl" aria-hidden />
                <div className="relative z-10">
                  <p className="capabilities-stat-number text-white font-black leading-tight">
                    <AnimatedStat
                      target={card.target}
                      suffix={card.suffix}
                      inView={statsInView}
                      delay={i * 120}
                    />
                  </p>
                  <p className="capabilities-stat-label text-white font-semibold">{card.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Development & Sampling – 2 columns: left content, right two images (height matches left) */}
      <section className="py-24 bg-white" aria-labelledby="product-development-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="min-w-0 text-left">
              <h2 id="product-development-heading" className="capabilities-section-heading text-left">
                Product Development & Sampling
              </h2>
              <p className="text-gray-600 text-left mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Our product development team works closely with brands to convert design concepts into production-ready garments. From pattern development and fabric inspection to garment sampling and fit testing, we ensure every product is refined before bulk manufacturing begins.
              </p>
            </div>
            <div className="min-w-0 capabilities-pd-visuals flex gap-3 lg:gap-4">
              <img
                src="https://ik.imagekit.io/tagunlimited/hoodie-manufacturing%20in-%20bangalore.webp"
                alt="Hoodie manufacturing in Bangalore – product development and sampling"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
              <img
                src="https://ik.imagekit.io/tagunlimited/jacket-manufacturer-in-bangalore.webp"
                alt="Jacket manufacturer in Bangalore – apparel production"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Garment Production – left = 2 images (vertical), right = heading + paragraph; same layout alignment as Product Development section */}
      <section className="py-24 bg-white" aria-labelledby="bulk-garment-production-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="min-w-0 capabilities-pd-visuals flex gap-3 lg:gap-4 order-2 lg:order-1">
              <img
                src="/hero-poster.webp"
                alt="Bulk garment production – apparel manufacturing facility"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
              <img
                src="https://ik.imagekit.io/tagunlimited/polo-tshirt-manufacturer-cap-manufacturer-hoodie-manufacturer.webp?updatedAt=1773140541934"
                alt="Polo, cap and hoodie manufacturer – bulk garment production"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
            </div>
            <div className="min-w-0 text-left lg:text-right order-1 lg:order-2 flex flex-col justify-center">
              <h2 id="bulk-garment-production-heading" className="capabilities-section-heading text-left lg:text-right">
                Bulk Garment Production
              </h2>
              <p className="text-gray-600 text-left lg:text-right mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Our production facility is equipped with modern industrial sewing machines and organized stitching lines designed to support scalable bulk garment manufacturing. Skilled production teams ensure precise stitching, consistent quality, and efficient workflows, allowing us to manufacture large volumes of T-shirts, hoodies, shirts, and custom apparel while maintaining reliable delivery timelines for fashion brands and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Systems */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-gray-900 text-center mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Quality Systems
            </h2>
            <p className="text-gray-600 text-center mb-12" style={{ fontSize: '18px', lineHeight: 1.8 }}>
              We maintain strict quality standards throughout the manufacturing process with comprehensive testing and inspection protocols.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {qualitySystems.map((system, index) => (
                <div key={index} className="bg-white p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
                    {index + 1}
                  </div>
                  <p className="text-gray-700" style={{ fontSize: '16px', fontWeight: 500 }}>
                    {system}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

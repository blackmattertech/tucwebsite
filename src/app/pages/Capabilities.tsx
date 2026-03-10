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

      {/* Fabric Sourcing & Material Handling – left = heading + paragraph, right = 2 images (height matches left) */}
      <section className="py-24 bg-white" aria-labelledby="fabric-sourcing-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="min-w-0 text-left">
              <h2 id="fabric-sourcing-heading" className="capabilities-section-heading text-left">
                Fabric Sourcing & Material Handling
              </h2>
              <p className="text-gray-600 text-left mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Efficient fabric handling plays a critical role in maintaining consistency in bulk garment manufacturing. At TAG Unlimited, fabrics undergo structured processes including fabric inspection, quality checking, and organized storage before entering the production line.
              </p>
              <p className="text-gray-600 text-left mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Our team ensures proper fabric sourcing, material preparation, and cutting workflows to support large-scale apparel manufacturing. This systematic approach helps maintain fabric quality, minimize production errors, and ensure smooth manufacturing of T-shirts, hoodies, shirts, jackets, and custom garments for fashion brands and apparel businesses.
              </p>
            </div>
            <div className="min-w-0 capabilities-pd-visuals flex gap-3 lg:gap-4">
              <img
                src="https://ik.imagekit.io/tagunlimited/other%20images/fabric%20rolls.webp?updatedAt=1772910857687"
                alt="Fabric rolls – material handling and sourcing"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
              <img
                src="https://ik.imagekit.io/tagunlimited/other%20images/cap-manufacturer-in-bangalore-cap-maker-in-india.webp"
                alt="Cap manufacturer in Bangalore – cap maker in India"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Added Services – full width, same heading style as Manufacturing Overview */}
      <section className="py-24 bg-white w-full" aria-labelledby="value-added-services-heading">
        <div className="w-full px-6 lg:px-12 text-center">
          <h2 id="value-added-services-heading" className="capabilities-section-heading capabilities-overview-heading-80">
            Value Added Services
          </h2>
        </div>
      </section>

      {/* Premium Garment Printing Techniques – left = 2 image cards with bottom overlay (yellow + white text), right = heading + paragraph */}
      <section className="py-24 bg-white" aria-labelledby="premium-printing-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="min-w-0 capabilities-pd-visuals flex gap-3 lg:gap-4 order-2 lg:order-1">
              <div className="capabilities-printing-card flex-1 min-w-0 flex flex-col rounded-2xl overflow-hidden">
                <div className="relative flex-1 min-h-[200px]">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/screen%20print%20in%20bangalore.webp"
                    alt="Screen printing in Bangalore – bulk apparel production"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">Screen Printing</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    A widely used printing technique for bulk apparel production, delivering vibrant colors and long-lasting prints ideal for T-shirts, hoodies, and promotional garments.
                  </p>
                </div>
              </div>
              <div className="capabilities-printing-card flex-1 min-w-0 flex flex-col rounded-2xl overflow-hidden">
                <div className="relative flex-1 min-h-[200px]">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/puff%20printing%20in%20bangalore.webp"
                    alt="Puff printing in Bangalore – 3D texture on garments"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">Puff Printing</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    A specialized screen printing technique that creates a raised 3D texture, adding depth and premium visual appeal to logos and graphics on garments.
                  </p>
                </div>
              </div>
            </div>
            <div className="min-w-0 text-left lg:text-right order-1 lg:order-2 flex flex-col justify-center">
              <h2 id="premium-printing-heading" className="capabilities-section-heading text-left lg:text-right">
                Premium Garment Printing Techniques
              </h2>
              <p className="text-gray-600 text-left lg:text-right mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Enhance garments with durable and high-quality printing methods designed for fashion brands, promotional apparel, and custom clothing production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Apparel Printing Solutions – full width; heading + paragraph left, 3 vertical cards in one row right; image height = text block height per card */}
      <section className="py-24 bg-white w-full" aria-labelledby="advanced-printing-heading">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-[minmax(0,28rem)_1fr] gap-12 lg:gap-16 items-center">
            <div className="min-w-0 text-left flex flex-col justify-center">
              <h2 id="advanced-printing-heading" className="capabilities-section-heading text-left">
                Advanced Apparel Printing Solutions
              </h2>
              <p className="text-gray-600 text-left mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Modern garment printing technologies that allow brands to apply detailed graphics, vibrant designs, and custom branding on apparel with precision.
              </p>
            </div>
            <div className="min-w-0 capabilities-advanced-printing-grid grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              <div className="capabilities-advanced-printing-vertical-card capabilities-advanced-printing-card rounded-2xl overflow-hidden">
                <div className="relative w-full capabilities-advanced-printing-card-image overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/tshirt%20printing%20in%20bangalore.webp"
                    alt="DTF printing – direct-to-film garment transfer"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={300}
                    height={400}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">DTF Printing (Direct-to-Film)</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    DTF printing enables high-detail graphics and vibrant color transfers onto garments, making it ideal for custom apparel and branded merchandise.
                  </p>
                </div>
              </div>
              <div className="capabilities-advanced-printing-vertical-card capabilities-advanced-printing-card rounded-2xl overflow-hidden">
                <div className="relative w-full capabilities-advanced-printing-card-image overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/hoodies%20manufacturer%20in%20bangalore.webp"
                    alt="Sublimation printing – full-color dye transfer"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={300}
                    height={400}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">Sublimation Printing</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    A dye-transfer printing process used for high-resolution, full-color graphics, commonly applied to polyester fabrics and performance apparel.
                  </p>
                </div>
              </div>
              <div className="capabilities-advanced-printing-vertical-card capabilities-advanced-printing-card rounded-2xl overflow-hidden">
                <div className="relative w-full capabilities-advanced-printing-card-image overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/private%20label%20manufacturing%20in%20bangalore.webp"
                    alt="Vinyl heat transfer printing"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={300}
                    height={400}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">Vinyl Printing</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    Vinyl heat transfer printing allows clean, bold logos and lettering to be applied to garments, often used for sportswear, team apparel, and custom branding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Embroidery & Apparel Branding – left = 2 image cards, right = heading + paragraph */}
      <section className="py-24 bg-white" aria-labelledby="custom-embroidery-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="min-w-0 capabilities-pd-visuals flex gap-3 lg:gap-4 order-2 lg:order-1">
              <div className="capabilities-printing-card flex-1 min-w-0 flex flex-col rounded-2xl overflow-hidden">
                <div className="relative flex-1 min-h-[200px]">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/embroidery%20in%20bangalore.webp"
                    alt="Machine embroidery in Bangalore – stitched logos and branding"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">Machine Embroidery</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    High-precision embroidery using multi-head machines to create detailed stitched logos, text, and branding on garments like caps, jackets, and hoodies.
                  </p>
                </div>
              </div>
              <div className="capabilities-printing-card flex-1 min-w-0 flex flex-col rounded-2xl overflow-hidden">
                <div className="relative flex-1 min-h-[200px]">
                  <img
                    src="https://ik.imagekit.io/tagunlimited/chenille%20embroidery%20in%20bangalore.webp"
                    alt="Chenille embroidery in Bangalore – textured patches and lettering"
                    className="absolute inset-0 w-full h-full object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <div className="capabilities-printing-overlay p-4 sm:p-5">
                  <p className="capabilities-printing-subheading text-gray-900 font-semibold mb-1">Chenille Embroidery</p>
                  <p className="capabilities-printing-text text-gray-800 text-sm sm:text-base leading-relaxed">
                    A textured embroidery style using looped yarn to produce bold, raised lettering and vintage-style patches, commonly used for varsity jackets and premium apparel.
                  </p>
                </div>
              </div>
            </div>
            <div className="min-w-0 text-left lg:text-right flex flex-col justify-center order-1 lg:order-2">
              <h2 id="custom-embroidery-heading" className="capabilities-section-heading text-left lg:text-right">
                Custom Embroidery & Apparel Branding
              </h2>
              <p className="text-gray-600 text-left lg:text-right mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Professional embroidery techniques that add durable stitched logos and premium branding to garments for fashion labels and corporate apparel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Control & Garment Inspection – left = heading + paragraph, right = 2 image cards */}
      <section className="py-24 bg-white" aria-labelledby="quality-control-heading">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            <div className="min-w-0 text-left flex flex-col justify-center">
              <h2 id="quality-control-heading" className="capabilities-section-heading text-left">
                Quality Control & Garment Inspection
              </h2>
              <p className="text-gray-600 text-left mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                Maintaining consistent quality is a critical part of our apparel manufacturing process. Every garment undergoes structured quality control inspections including fabric checking, stitching verification, print and embroidery alignment, measurement accuracy, and finishing standards. This multi-stage inspection ensures reliable bulk garment production, consistent product quality, and export-grade apparel manufacturing for fashion brands and businesses worldwide.
              </p>
            </div>
            <div className="min-w-0 capabilities-pd-visuals flex gap-3 lg:gap-4">
              <img
                src="https://ik.imagekit.io/tagunlimited/infrastructure/best%20garment%20factory%20i%20india.webp"
                alt="Quality control and garment inspection at apparel manufacturing facility in India"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
              <img
                src="https://ik.imagekit.io/tagunlimited/tshirt%20manufacturing%20in%20bangalore%20india.webp"
                alt="Garment inspection and quality checking in Bangalore apparel factory"
                className="capabilities-pd-img rounded-2xl object-cover"
                width={300}
                height={400}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Systems – black background with marquee text only (Tag Factor style) */}
      <section className="capabilities-quality-section py-24" aria-label="Quality and TAG Factor">
        <div className="capabilities-quality-dots" aria-hidden />
        <div className="capabilities-quality-marquees-wrap">
          <div className="capabilities-quality-marquees">
            {[
              { text: 'Well-diversified products.', color: '#FECC00' },
              { text: 'Adhering to high-standard of EHS compliance.', color: '#FFFFFF' },
              { text: 'Globally recognised for complex value-added garments.', color: '#FECC00' },
              { text: 'Professionally managed and focused on sustainable business processes.', color: '#FFFFFF' },
            ].map(({ text, color }, index) => (
              <div key={index} className="capabilities-quality-marquee-track">
                <div className="capabilities-quality-marquee-inner">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="capabilities-quality-marquee-text"
                      style={{
                        color: 'transparent',
                        WebkitTextStroke: `2px ${color}`,
                      }}
                      aria-hidden
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

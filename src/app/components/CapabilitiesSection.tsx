import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'motion/react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';
import { useIsMobile } from './ui/use-mobile';
import { useMediaAssets } from '../lib/useMediaAssets';
import { OptimizedImage } from './OptimizedImage';
import './CapabilitiesSection.css';

/** Loaded only on desktop – avoids CardSwap/GSAP on mobile. */
const CapabilitiesSectionDesktopLazy = lazy(() =>
  import('./CapabilitiesSectionDesktop').then((m) => ({ default: m.CapabilitiesSectionDesktop }))
);

/** Responsive card dimensions so all 4 slides fit inside container at any viewport */
function useCardSwapDimensions() {
  const [dims, setDims] = useState({ width: 640, height: 450 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) {
        setDims({ width: 300, height: 210 });
      } else if (w <= 640) {
        setDims({ width: 360, height: 253 });
      } else if (w <= 768) {
        setDims({ width: 400, height: 281 });
      } else if (w <= 1024) {
        setDims({ width: 520, height: 366 });
      } else {
        setDims({ width: 640, height: 450 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return dims;
}

/** Single source of capability items; same sequence is used for CardSwap (desktop) and carousel (mobile). */
const CAPABILITY_ITEMS = [
  {
    image: 'Deep Design Proficiency.webp',
    label: 'Deep Design Proficiency',
    title: 'Deep Design Proficiency',
    description:
      'Our team brings deep design proficiency to every project—from concept to final artwork—ensuring your apparel reflects your brand vision with precision and creativity.',
  },
  {
    image: 'Expert Product Development.webp',
    label: 'Expert Product Development',
    title: 'Expert Product Development',
    description:
      'From concept to production, we bring expert product development to every garment—refining designs, materials, and fit so your product meets quality and commercial goals.',
  },
  {
    image: 'End-to-End Garment Manufacturing.webp',
    label: 'End-to-End Garment Manufacturing',
    title: 'End-to-End Garment Manufacturing',
    description:
      'We deliver end-to-end garment manufacturing—from sourcing and cutting to stitching, finishing, and quality control—so you get a single, reliable partner for your full production run.',
  },
  {
    image: 'image.webp',
    label: 'ERP-Driven Production Managements',
    title: 'ERP-Driven Production Management',
    description:
      'Our ERP system tracks every stage of garment production — from sampling to final dispatch — providing real-time visibility into order status, production timelines and delivery schedules.',
  },
] as const;

function CapabilityCardContent({
  image,
  label,
  errored,
  onError,
  getUrl,
}: {
  image: string;
  label: string;
  errored: boolean;
  onError: () => void;
  getUrl: (folder: string, file_name: string) => string;
}) {
  if (errored) {
    return (
      <div className="capability-card-fallback">
        <span>{label}</span>
      </div>
    );
  }
  return (
    <OptimizedImage
      src={getUrl('other images', image)}
      alt={label}
      onError={onError}
      width={640}
      height={450}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover block"
      style={{ borderRadius: 12 }}
    />
  );
}

export function CapabilitiesSection() {
  const { getUrl } = useMediaAssets();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [imageErrored, setImageErrored] = useState<Record<number, boolean>>({});
  const [frontCardIndex, setFrontCardIndex] = useState(0);
  const [jumpToIndex, setJumpToIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const cardDims = useCardSwapDimensions();

  /** Ref that CardSwap keeps updated with the visible front card index */
  const frontIndexRef = useRef<number | null>(0);

  /** Sync text content with carousel slide on mobile. Embla with loop can use duplicate slide indices, so map to content index 0..N-1. */
  useEffect(() => {
    if (!carouselApi) return;
    const syncTextToSlide = () => {
      const snapIndex = carouselApi.selectedScrollSnap();
      const contentIndex = snapIndex % CAPABILITY_ITEMS.length;
      setFrontCardIndex(contentIndex);
    };
    syncTextToSlide(); // sync immediately when API is ready
    carouselApi.on('select', syncTextToSlide);
    return () => {
      carouselApi.off('select', syncTextToSlide);
    };
  }, [carouselApi]);

  /** Auto-advance carousel on mobile (e.g. every 3s) */
  const CAROUSEL_AUTO_DELAY_MS = 3000;
  useEffect(() => {
    if (!carouselApi) return;
    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, CAROUSEL_AUTO_DELAY_MS);
    return () => clearInterval(interval);
  }, [carouselApi]);

  // Single index for both card stack and text: card at front and content always match.
  const activeCapabilityIndex = Math.max(0, Math.min(frontCardIndex, CAPABILITY_ITEMS.length - 1));
  const currentItem = CAPABILITY_ITEMS[activeCapabilityIndex];

  const handleImageError = (index: number) => {
    setImageErrored((prev) => ({ ...prev, [index]: true }));
  };

  /** When the front card changes (auto-rotate), update state so pills and text match the visible card */
  const handleFrontCardChange = useCallback((index: number) => {
    const next = Math.max(0, Math.min(index, CAPABILITY_ITEMS.length - 1));
    setFrontCardIndex(next);
  }, []);

  /** When user clicks a pill, update both the text/pill state and tell CardSwap to jump to that card */
  const handlePillClick = (index: number) => {
    const next = Math.max(0, Math.min(index, CAPABILITY_ITEMS.length - 1));
    setFrontCardIndex(next);
    setJumpToIndex(next);
  };

  // Clear jumpToIndex after CardSwap has processed it
  useEffect(() => {
    if (jumpToIndex === null) return;
    const t = setTimeout(() => setJumpToIndex(null), 100);
    return () => clearTimeout(t);
  }, [jumpToIndex]);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="capabilities-section"
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div className="capabilities-container" initial={{ opacity: 0, y: 32 }} animate={sectionInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <header className="capabilities-header">
          <h2 className="capabilities-heading">OUR CAPABILITIES</h2>
          <p className="capabilities-subheading">Manufacturing</p>
          <div className="capabilities-pills" role="tablist" aria-label="Capability tabs">
            {CAPABILITY_ITEMS.map(({ label }, index) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={index === activeCapabilityIndex}
                aria-controls="capabilities-content"
                id={`capability-tab-${index}`}
                className={`capabilities-pill ${index === activeCapabilityIndex ? 'capabilities-pill-active' : ''}`}
                onClick={() => handlePillClick(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </header>
        {/* Left: changing text block + static button (button does not re-mount when slide changes) */}
        <div className="capabilities-left" id="capabilities-content" role="region" aria-label={`Content for ${currentItem.label}`}>
          <div className="capabilities-text-block" key={activeCapabilityIndex}>
            <p className="capabilities-label" aria-live="polite">{currentItem.label}</p>
            <h2 className="capabilities-title" aria-live="polite">{currentItem.title}</h2>
            <p className="capabilities-description">{currentItem.description}</p>
          </div>
          <Link to="/capabilities" className="primary-btn capabilities-cta-btn">
            Explore Our Manufacturing Capabilities
          </Link>
        </div>
        <div className="capabilities-right">
          {/* Desktop only: lazy-loaded so mobile never downloads CardSwap/GSAP */}
          {!isMobile && (
            <Suspense fallback={<div className="capabilities-cardswap-wrapper min-h-[280px]" aria-hidden />}>
              <CapabilitiesSectionDesktopLazy
                getUrl={getUrl}
                imageErrored={imageErrored}
                onImageError={handleImageError}
                onFrontCardChange={handleFrontCardChange}
                frontIndexRef={frontIndexRef}
                jumpToIndex={jumpToIndex}
                cardDims={cardDims}
              />
            </Suspense>
          )}
          {/* Mobile only: image carousel; text stays in sync because CardSwap is unmounted */}
          {isMobile && (
          <div className="capabilities-carousel-wrapper">
            <Carousel
              setApi={setCarouselApi}
              opts={{ align: 'center', loop: true, skipSnaps: false }}
              className="capabilities-carousel"
            >
              <CarouselContent className="capabilities-carousel-content">
                {/* Same sequence as CardSwap: CAPABILITY_ITEMS array order (index 0, 1, 2, 3) */}
                {CAPABILITY_ITEMS.map((item, index) => (
                  <CarouselItem key={`capability-${index}`} className="capabilities-carousel-item">
                    <div className="capabilities-carousel-slide">
                      <CapabilityCardContent
                        image={item.image}
                        label={item.label}
                        errored={!!imageErrored[index]}
                        onError={() => handleImageError(index)}
                        getUrl={getUrl}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="capabilities-carousel-dots" aria-hidden>
              {CAPABILITY_ITEMS.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`capabilities-carousel-dot ${index === activeCapabilityIndex ? 'capabilities-carousel-dot-active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => carouselApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

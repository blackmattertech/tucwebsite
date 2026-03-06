import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import CardSwap, { Card } from '../../components/CardSwap';
import { capabilityImageUrl } from '../lib/supabaseStorage';
import './CapabilitiesSection.css';

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
    label: 'Our Capabilities',
    title: 'Our Capabilities',
    description:
      'Explore our full range of design, development, and manufacturing capabilities for your apparel needs.',
  },
];

function CapabilityCardContent({
  image,
  label,
  errored,
  onError,
}: {
  image: string;
  label: string;
  errored: boolean;
  onError: () => void;
}) {
  if (errored) {
    return (
      <div className="capability-card-fallback">
        <span>{label}</span>
      </div>
    );
  }
  return (
    <img
      src={capabilityImageUrl(image)}
      alt={label}
      onError={onError}
      loading="lazy"
      referrerPolicy="no-referrer"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 12,
        display: 'block',
      }}
    />
  );
}

export function CapabilitiesSection() {
  const [imageErrored, setImageErrored] = useState<Record<number, boolean>>({});
  const [frontCardIndex, setFrontCardIndex] = useState(0);
  const [jumpToIndex, setJumpToIndex] = useState<number | null>(null);
  const cardDims = useCardSwapDimensions();

  /** Ref that CardSwap keeps updated with the visible front card index */
  const frontIndexRef = useRef<number | null>(0);

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
      id="capabilities"
      className="capabilities-section"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle at center, #AAAAEE 0, #AAAAEE 1px, transparent 1px)',
        backgroundSize: '12px 12px',
      }}
    >
      <div className="capabilities-container">
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
        {/* Left content and active pill are driven by the card currently in front (activeCapabilityIndex) */}
        <div className="capabilities-left capabilities-text-block" key={activeCapabilityIndex} id="capabilities-content" role="region" aria-label={`Content for ${currentItem.label}`}>
          <p className="capabilities-label" aria-live="polite">{currentItem.label}</p>
          <h2 className="capabilities-title" aria-live="polite" key={`title-${activeCapabilityIndex}`}>
            {currentItem.title}
          </h2>
          <p className="capabilities-description" key={`desc-${activeCapabilityIndex}`}>
            {currentItem.description}
          </p>
         
          <Link to="/capabilities" className="primary-btn">
            Explore Our Manufacturing Capabilities
          </Link>
        </div>
        <div className="capabilities-right">
          <div className="capabilities-cardswap-wrapper">
            <CardSwap
              width={cardDims.width}
              height={cardDims.height}
              cardDistance={40}
              verticalDistance={50}
              delay={3000}
              pauseOnHover
              initialFrontIndex={jumpToIndex ?? undefined}
              onFrontCardChange={handleFrontCardChange}
              frontIndexRef={frontIndexRef}
            >
              {CAPABILITY_ITEMS.map(({ image, label }, index) => (
                <Card key={label}>
                  <CapabilityCardContent
                    image={image}
                    label={label}
                    errored={!!imageErrored[index]}
                    onError={() => handleImageError(index)}
                  />
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}

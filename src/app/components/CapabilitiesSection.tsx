import { useState } from 'react';
import { Link } from 'react-router';
import CardSwap, { Card } from '../../components/CardSwap';
import './CapabilitiesSection.css';

const CAPABILITY_ITEMS = [
  {
    image: 'Deep Design Proficiency.png',
    label: 'Deep Design Proficiency',
    title: 'Deep Design Proficiency',
    description:
      'Our team brings deep design proficiency to every project—from concept to final artwork—ensuring your apparel reflects your brand vision with precision and creativity.',
  },
  {
    image: 'Expert Product Development.png',
    label: 'Expert Product Development',
    title: 'Expert Product Development',
    description:
      'From concept to production, we bring expert product development to every garment—refining designs, materials, and fit so your product meets quality and commercial goals.',
  },
  {
    image: 'End-to-End Garment Manufacturing.png',
    label: 'End-to-End Garment Manufacturing',
    title: 'End-to-End Garment Manufacturing',
    description:
      'We deliver end-to-end garment manufacturing—from sourcing and cutting to stitching, finishing, and quality control—so you get a single, reliable partner for your full production run.',
  },
  {
    image: 'ERP-Driven Production Management.png',
    label: 'ERP-Driven Production Management',
    title: 'ERP-Driven Production Management',
    description:
      'Our ERP system tracks every stage of garment production—from sampling to final dispatch—providing real-time visibility, structured workflows, and reliable delivery timelines.',
  },
];

function CapabilityCardContent({
  image,
  label,
  index,
  errored,
  onError,
}: {
  image: string;
  label: string;
  index: number;
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
      src={`/capabilities/${encodeURIComponent(image)}`}
      alt={label}
      onError={onError}
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

  const safeIndex = Math.max(0, Math.min(frontCardIndex, CAPABILITY_ITEMS.length - 1));
  const currentItem = CAPABILITY_ITEMS[safeIndex];

  const handleImageError = (index: number) => {
    setImageErrored((prev) => ({ ...prev, [index]: true }));
  };

  const handleFrontCardChange = (index: number) => {
    setFrontCardIndex(Math.max(0, Math.min(index, CAPABILITY_ITEMS.length - 1)));
  };

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
      <h2 className="capabilities-section-heading">Our Capabilities</h2>
      <h3 className="capabilities-subheading">Manufacturing</h3>
      <div className="capability-pills-wrap">
        <div className="capability-pills" role="tablist" aria-label="Capabilities">
          {CAPABILITY_ITEMS.map(({ label }, index) => (
            <span
              key={label}
              className={`capability-pill ${index === safeIndex ? 'capability-pill-active' : ''}`}
              role="tab"
              aria-selected={index === safeIndex}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="capabilities-container">
        <div className="capabilities-left">
          <h2 className="capabilities-title" key={safeIndex}>
            {currentItem.title}
          </h2>
          <p className="capabilities-description" key={`desc-${safeIndex}`}>
            {currentItem.description}
          </p>
          <Link to="/capabilities" className="primary-btn">
            Explore Our Manufacturing Capabilities
          </Link>
        </div>
        <div className="capabilities-right">
          <div className="capabilities-cardswap-wrapper">
            <CardSwap
              width={640}
              height={450}
              cardDistance={24}
              verticalDistance={36}
              delay={300}
              pauseOnHover
              onFrontCardChange={handleFrontCardChange}
            >
              {CAPABILITY_ITEMS.map(({ image, label }, index) => (
                <Card key={label}>
                  <CapabilityCardContent
                    image={image}
                    label={label}
                    index={index}
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

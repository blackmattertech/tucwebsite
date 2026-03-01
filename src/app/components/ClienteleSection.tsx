import { clientLogos } from '../../data/client-logos';

const LOGOS_BASE = '/client logos';

export function ClienteleSection() {
  const logos = clientLogos;
  if (logos.length === 0) return null;

  // Duplicate set for seamless loop
  const duplicated = [...logos, ...logos];

  return (
    <section className="bg-gray-50 border-y border-gray-200/80 overflow-hidden mt-12 md:mt-16" aria-label="Our clients">
      <div className="w-full py-8 md:py-10">
        <div className="marquee-track">
          <div className="marquee-inner">
            {duplicated.map((name, i) => (
              <div key={`${name}-${i}`} className="marquee-item">
                <img
                  src={`${LOGOS_BASE}/${encodeURIComponent(name)}`}
                  alt=""
                  className="marquee-logo"
                  loading="lazy"
                  width={120}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .marquee-track {
          width: 100%;
          overflow: hidden;
          user-select: none;
        }
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2rem;
          padding-right: 2rem;
          height: 3rem;
        }
        .marquee-logo {
          max-height: 2.5rem;
          max-width: 8rem;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(0.4) opacity(0.85);
          transition: filter 0.2s ease;
        }
        .marquee-item:hover .marquee-logo {
          filter: grayscale(0) opacity(1);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

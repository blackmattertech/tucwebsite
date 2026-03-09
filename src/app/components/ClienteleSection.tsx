import { useMediaAssets } from '../lib/useMediaAssets';
import { OptimizedImage } from './OptimizedImage';
import { Link } from 'react-router';

/** Derive SEO-friendly alt from logo filename (e.g. "kfc_logo.svg" → "KFC"). */
function logoAlt(filename: string): string {
  const known: Record<string, string> = {
    "1024px-Cisco_logo.svg_.png": "Cisco",
    "98b4e8_d71ea6626990460c8891b856b61618bamv2.webp": "Client",
    "Acc_Logo_Black_Purple_RGB.png": "Accenture",
    "Bank_of_Baroda_logo-3.svg": "Bank of Baroda",
    "Tesco_Logo.svg_.png": "Tesco",
    "Zomato-Logo.png": "Zomato",
    "basf_logo.svg": "BASF",
    "download-17.png": "Client",
    "huawei_  logo.svg": "Huawei",
    "john_deere logo.svg": "John Deere",
    "kellogg's_logo.svg": "Kellogg's",
    "kfc_logo.svg": "KFC",
    "philips_logo.svg": "Philips",
    "pwc_logo.svg": "PwC",
    "red_bull logo.svg": "Red Bull",
  };
  if (known[filename]) return known[filename];
  const base = filename.replace(/\.[^.]+$/, '').replace(/[_\-]+/g, ' ').replace(/\s*logo\s*$/i, '').trim();
  return base.length > 2 && base.length < 50 ? base : 'Client';
}

const CLIENT_LOGOS_FOLDER = 'client-logos';
/** Cap marquee size to avoid excessive DOM/images on mobile if folder grows */
const MAX_LOGOS_IN_MARQUEE = 20;

export function ClienteleSection() {
  const { getUrl, getFileNamesByFolder } = useMediaAssets();
  const logos = getFileNamesByFolder(CLIENT_LOGOS_FOLDER);
  if (logos.length === 0) return null;

  const capped = logos.slice(0, MAX_LOGOS_IN_MARQUEE);
  const duplicated = [...capped, ...capped];

  return (
    <section className="overflow-hidden mt-12 md:mt-16" aria-label="Our clients">
      <div className="w-full py-8 md:py-10">
        <div className="marquee-track">
          <div className="marquee-inner">
            {duplicated.map((name, i) => (
              <div key={`${name}-${i}`} className="marquee-item">
                <OptimizedImage
                  src={getUrl('client-logos', name)}
                  alt={logoAlt(name)}
                  width={120}
                  height={48}
                  unoptimized={name.endsWith('.svg')}
                  className="marquee-logo"
                  loading="lazy"
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
        @media (prefers-reduced-motion: reduce) {
          .marquee-inner {
            animation: none;
          }
        }
        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2.5rem;
          padding-right: 2.5rem;
          height: 9rem;
        }
        .marquee-logo {
          max-height: 7.5rem;
          max-width: 12rem;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(0.4) opacity(0.85);
          transition: filter 0.25s ease, transform 0.25s ease;
        }
        .marquee-inner:hover .marquee-item:not(:hover) .marquee-logo {
          filter: grayscale(0.8) blur(1px) opacity(0.45);
        }
        .marquee-item:hover .marquee-logo {
          filter: none;
          transform: translateY(-6px) scale(1.03);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex justify-center mt-8 md:mt-10">
        <Link
          to="/contact-apparel-manufacturer-bangalore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-gray-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fecc00]"
          style={{ backgroundColor: '#fecc00' }}
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Catalog
        </Link>
      </div>
    </section>
  );
}

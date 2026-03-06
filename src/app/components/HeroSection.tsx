import React, { useRef, useEffect, useState } from 'react';
import { TextType } from './TextType';
import RotatingText from './RotatingText';

/** Set to your CDN origin (e.g. https://cdn.example.com) to serve hero video from CDN; leave empty to use same origin. */
const VIDEO_BASE = typeof import.meta.env !== 'undefined' && import.meta.env.VITE_VIDEO_CDN ? import.meta.env.VITE_VIDEO_CDN : '';
const DESKTOP_VIDEO = `https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public/website%20videos/herosection/apparel-manufacturer-in-bangalore%20(2).mp4`;
const MOBILE_VIDEO = `https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public/website%20videos/herosection/custom%20apparel%20manufacturer.mp4`;
/** Poster shown until video loads (improves LCP). Use a frame or representative image. */
const HERO_POSTER = '/best%20garment%20factory%20in%20bangalore.png';

const HERO_HEADING_LINES = [
  'Private Label Clothing & Knitwear\nManufacturer in Bangalore',
  'High-Quality Apparel Manufacturing in Bangalore',
];

const HERO_ROTATING_PHRASES = [
  'Private Label T-Shirts',
  'Premium Polo T-Shirts',
  'Custom Hoodies',
  'Formal & Casual Shirts',
  'Corporate Uniforms',
  'Industrial Workwear',
  'School Uniforms',
  'Sportswear',
  'Trackpants & Shorts',
  'Custom Jackets',
  'Caps & Accessories',
  'Private Label Apparel',
  'OEM Apparel',
  'Bulk Garment Orders',
  'Export Quality Garments',
];

const BRAND_YELLOW = '#FECC00';

export function HeroSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  const ensurePlaying = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  };

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handle = () => setIsMobileViewport(mq.matches);
    handle();
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  useEffect(() => {
    ensurePlaying(desktopVideoRef.current);
    ensurePlaying(mobileVideoRef.current);
  }, []);

  return (
    <section id="hero" className="relative w-screen h-[100dvh] min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Video - Desktop: poster improves LCP; only visible video preloads fully */}
      <video
        ref={desktopVideoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={HERO_POSTER}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        onEnded={(e) => e.currentTarget.play()}
      >
        <source src={DESKTOP_VIDEO} type="video/mp4" />
      </video>

      {/* Background Video - Mobile: poster improves LCP; preload=metadata for fast initial load */}
      <video
        ref={mobileVideoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={HERO_POSTER}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        onEnded={(e) => e.currentTarget.play()}
      >
        <source src={MOBILE_VIDEO} type="video/mp4" />
      </video>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        {/* H1: Original typing headline - slightly smaller */}
        <h1
          className="text-white mb-5 min-h-[1.2em] flex flex-wrap items-center justify-center gap-x-2 gap-y-0"
          style={{
            fontSize: 'clamp(1.95rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          <TextType
            as="span"
            text={HERO_HEADING_LINES}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={2500}
            initialDelay={600}
            loop
            showCursor
            cursorCharacter="|"
            cursorClassName="text-white"
            cursorBlinkDuration={0.6}
            className="text-white inline"
            startOnVisible
          />
        </h1>

        {/* We Manufacture [ Rotating Highlight ] - slightly smaller */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-10"
          style={{
            fontSize: 'clamp(1.5rem, 3.75vw, 3.25rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            fontFamily: 'var(--font-family)',
          }}
        >
          <span className="text-white" style={{ color: '#E5E5E5' }}>
            We Manufacture
          </span>
          <span
            className="inline-flex items-center justify-center shrink-0"
            style={{
              backgroundColor: BRAND_YELLOW,
              color: '#111',
              padding: 'clamp(0.5rem, 1.2vw, 0.75rem) clamp(0.9rem, 1.5vw, 1.125rem)',
              borderRadius: 'clamp(8px, 0.75vw, 14px)',
              fontWeight: 700,
            }}
          >
            <RotatingText
              texts={HERO_ROTATING_PHRASES}
              splitBy="lines"
              rotationInterval={2800}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              animatePresenceMode="wait"
              mainClassName="hero-rotating-text"
              elementLevelClassName="hero-rotating-element"
              style={{
                color: '#111',
                fontSize: 'inherit',
                fontWeight: 700,
              }}
            />
          </span>
        </div>

        {/* Trust Text */}
        <p
          className="text-white/80"
          style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)', fontWeight: 500, letterSpacing: '0.5px' }}
        >
          Trusted Apparel Manufacturing Partner for Brands and Businesses Across
          India
        </p>
      </div>

      <style>{`
        .hero-rotating-text { color: #111; font-weight: 700; }
        .hero-rotating-element { color: #111; font-weight: 700; }
      `}</style>
    </section>
  );
}

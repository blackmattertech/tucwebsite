import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { TextType } from './TextType';
import { HERO_POSTER } from '../../hero-poster-config';
import { useMediaAssets } from '../lib/useMediaAssets';
import { useViewport } from '../context/ViewportContext';

/** Loaded only on desktop – avoids Motion/heavy animation on mobile. */
const RotatingTextLazy = lazy(() =>
  import('./RotatingText').then((m) => ({ default: m.default }))
);

/** Set to your CDN origin (e.g. https://cdn.example.com) to serve hero video from CDN; leave empty to use same origin. */
const VIDEO_BASE = typeof import.meta.env !== 'undefined' && import.meta.env.VITE_VIDEO_CDN ? import.meta.env.VITE_VIDEO_CDN : '';
const DESKTOP_VIDEO_FILE = 'apparel-manufacturer-in-bangalore (2).mp4';
const MOBILE_VIDEO_FILE = 'custom apparel manufacturer.mp4';

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

const VIDEO_LOAD_DELAY_MS = 2000;

export const HeroSection = React.memo(function HeroSection() {
  const { getUrl } = useMediaAssets();
  const { isDesktop, ready } = useViewport();
  const posterImgRef = useRef<HTMLImageElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);
  const desktopVideoSrc = getUrl('herosection', DESKTOP_VIDEO_FILE);
  const mobileVideoSrc = getUrl('herosection', MOBILE_VIDEO_FILE);
  const [isMobileViewport, setIsMobileViewport] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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

  // LCP optimization: load video only after 2s idle or first scroll (dramatically improves mobile PageSpeed)
  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), VIDEO_LOAD_DELAY_MS);
    const onScroll = () => setShouldLoadVideo(true);
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Only the active viewport's video has a source (performance: avoid loading both)
  useEffect(() => {
    if (!shouldLoadVideo || videoError) return;
    if (isMobileViewport) {
      ensurePlaying(mobileVideoRef.current);
      desktopVideoRef.current?.pause();
    } else {
      ensurePlaying(desktopVideoRef.current);
      mobileVideoRef.current?.pause();
    }
  }, [isMobileViewport, shouldLoadVideo, videoError]);

  // Set fetchpriority via DOM to avoid React prop warning (HTML attribute is lowercase)
  useEffect(() => {
    posterImgRef.current?.setAttribute('fetchpriority', 'high');
  }, []);

  // Subtle parallax on hero background (scroll-based)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const height = section.offsetHeight;
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const scrollProgress = -rect.top / (window.innerHeight + height);
        setParallaxY(scrollProgress * height * 0.15);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative w-screen h-[100dvh] min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background layer: parallax translate */}
      <div className="absolute inset-0 overflow-hidden" style={{ transform: `translate3d(0, ${parallaxY}px, 0)` }}>
        <img
          ref={posterImgRef}
          src={HERO_POSTER}
          alt="TAG Unlimited – Private label apparel manufacturer in Bangalore"
          width={1920}
          height={1080}
          sizes="100vw"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: videoError || !shouldLoadVideo ? 0 : -1 }}
        />
        {shouldLoadVideo && !videoError && (
          <>
            <video
              ref={desktopVideoRef}
              autoPlay
              loop
              muted
              playsInline
              poster={HERO_POSTER}
              preload="none"
              className="absolute inset-0 w-full h-full object-cover hidden md:block"
              onEnded={(e) => e.currentTarget.play()}
              onError={() => setVideoError(true)}
            >
              {!isMobileViewport && <source src={desktopVideoSrc} type="video/mp4" />}
            </video>
            <video
              ref={mobileVideoRef}
              autoPlay
              loop
              muted
              playsInline
              poster={HERO_POSTER}
              preload="none"
              className="absolute inset-0 w-full h-full object-cover md:hidden"
              onEnded={(e) => e.currentTarget.play()}
              onError={() => setVideoError(true)}
            >
              {isMobileViewport && <source src={mobileVideoSrc} type="video/mp4" />}
            </video>
          </>
        )}
      </div>

      {/* Fabric wave motion overlay (subtle) */}
      <div
        className="absolute inset-0 pointer-events-none hero-fabric-wave"
        style={{ zIndex: 1 }}
        aria-hidden
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" style={{ zIndex: 2 }} />

      {/* Content – min-height reserves space to reduce CLS when fonts/typing load */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center" style={{ minHeight: 'min(280px, 38vh)' }}>
        {/* H1: Hero title – Montserrat, fluid, max-width for readability */}
        <h1
          className="text-white min-h-[1.2em] flex flex-wrap items-center justify-center gap-x-2 gap-y-0 mx-auto"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '900px',
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

        {/* We Manufacture [ Rotating Highlight ] – subheading scale */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-10"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 600,
            lineHeight: 1.2,
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
            {ready && isDesktop ? (
              <Suspense fallback={<span>Private Label Apparel</span>}>
                <RotatingTextLazy
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
              </Suspense>
            ) : (
              <span>Private Label Apparel</span>
            )}
          </span>
        </div>

        {/* Trust Text – lead paragraph */}
        <p
          className="text-white/80 mx-auto"
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 'clamp(18px, 1.5vw, 20px)',
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: '720px',
          }}
        >
          Trusted Apparel Manufacturing Partner for Brands and Businesses Across
          India
        </p>
      </div>

      <style>{`
        .hero-rotating-text { color: #111; font-weight: 700; }
        .hero-rotating-element { color: #111; font-weight: 700; }
        .hero-fabric-wave {
          background: repeating-linear-gradient(
            105deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.02) 40px,
            rgba(255,255,255,0.02) 41px
          );
          animation: hero-fabric-wave 12s ease-in-out infinite;
        }
        @keyframes hero-fabric-wave {
          0%, 100% { opacity: 1; transform: translateX(0) scale(1.02); }
          50% { opacity: 0.85; transform: translateX(2%) scale(1.03); }
        }
        @media (prefers-reduced-motion: reduce) { .hero-fabric-wave { animation: none; } }
      `}</style>
    </section>
  );
});

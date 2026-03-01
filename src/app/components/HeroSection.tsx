import React, { useRef, useEffect } from 'react';
import { TextType } from './TextType';
import { ShinyText } from './ShinyText';

const DESKTOP_VIDEO = '/desktop/apparel-manufacturer-in-bangalore.mp4';
const MOBILE_VIDEO = '/mobile/custom%20apparel%20manufacturer.mp4';

const HERO_HEADING_LINES = [
  'Private Label Clothing & Knitwear\nManufacturer in Bangalore',
  'High-Quality Apparel Manufacturing in Bangalore',
];

export function HeroSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const ensurePlaying = (el: HTMLVideoElement | null) => {
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  };

  useEffect(() => {
    ensurePlaying(desktopVideoRef.current);
    ensurePlaying(mobileVideoRef.current);
  }, []);

  return (
    <section className="relative w-screen min-h-[600px] h-[100dvh] min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Video - Desktop (full screen, muted, loop) */}
      <video
        ref={desktopVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        onEnded={(e) => e.currentTarget.play()}
      >
        <source src={DESKTOP_VIDEO} type="video/mp4" />
      </video>

      {/* Background Video - Mobile (full screen, muted, loop) */}
      <video
        ref={mobileVideoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        onEnded={(e) => e.currentTarget.play()}
      >
        <source src={MOBILE_VIDEO} type="video/mp4" />
      </video>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h1
          className="text-white mb-6 min-h-[1.2em] flex flex-wrap items-center justify-center gap-x-2 gap-y-0"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 1.1 }}
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
        
        <p className="max-w-3xl mx-auto mb-10" style={{ fontSize: 'clamp(1.375rem, 2.75vw, 1.875rem)', lineHeight: 1.6, fontWeight: 400 }}>
          <ShinyText
            text="High-capacity apparel manufacturing for T-Shirts, Hoodies, Shirts and Custom Garments with structured production systems and reliable on-time delivery."
            color="rgba(255,255,255,0.85)"
            shineColor="#ffffff"
            speed={2.5}
            spread={100}
            yoyo
            pauseOnHover
            className="block text-center"
          />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 hover:bg-gray-100 transition-colors" style={{ fontSize: '16px', fontWeight: 600 }}>
            Request Production Quote
          </button>
          <button className="w-full sm:w-auto bg-transparent text-white border-2 border-white px-8 py-4 hover:bg-white/10 transition-colors" style={{ fontSize: '16px', fontWeight: 600 }}>
            Contact Manufacturer
          </button>
        </div>

        {/* Trust Text */}
        <p className="text-white/80" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.5px' }}>
          Trusted Apparel Manufacturing Partner for Brands and Businesses Across India
        </p>
      </div>
    </section>
  );
}

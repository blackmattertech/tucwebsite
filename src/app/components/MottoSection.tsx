import React from 'react';

const LOGO_YELLOW = '#fecc00';

export function MottoSection() {
  return (
    <section className="bg-black py-16 md:py-20 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center text-white">
        <p
          className="uppercase tracking-[0.25em] mb-4 text-xs sm:text-sm"
          style={{ color: LOGO_YELLOW, fontWeight: 700, letterSpacing: '0.25em' }}
        >
          OUR MOTTO REMAINS SIMPLE
        </p>
        <h2
          className="mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(32px, 8vw, 64px)',
            lineHeight: 0.95,
            letterSpacing: '-1px',
            textTransform: 'uppercase',
          }}
        >
          “LOWEST MOQ WITH LIMITLESS{' '}
          <span
            style={{
              display: 'inline-block',
              fontSize: 'clamp(56px, 16vw, 120px)',
              lineHeight: 0.9,
            }}
          >
            CUSTOMIZATION
          </span>
          ”
        </h2>
      </div>
    </section>
  );
}


import React from 'react';
import { ClienteleSection } from './ClienteleSection';

export function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2
          className="text-gray-900 text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Trusted Clothing Manufacturer for Growing Brands
        </h2>
      </div>
      <ClienteleSection />
    </section>
  );
}

import React from 'react';
import { ClienteleSection } from './ClienteleSection';

export function TrustSection() {
  return (
    <section
      id="trust"
      className="py-14 md:py-20 lg:py-28"
      style={{
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle at center, #AAAAEE 0, #AAAAEE 1px, transparent 1px)',
        backgroundSize: '12px 12px',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <h2
          className="text-gray-900 text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Trusted Clothing Manufacturer for Growing Brands
        </h2>
      </div>
      <ClienteleSection />
    </section>
  );
}

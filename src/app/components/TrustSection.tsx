import React from 'react';
import './TrustSection.css';
import { ClienteleSection } from './ClienteleSection';

export function TrustSection() {
  return (
    <section
      id="trust"
      className="py-14 md:py-20 lg:py-28"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="trust-section-heading">
          Trusted Clothing Manufacturer for Growing Brands
        </h2>
      </div>
      <ClienteleSection />
    </section>
  );
}

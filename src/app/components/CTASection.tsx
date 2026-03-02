import React from "react";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  dark?: boolean;
}

export function CTASection({ title, description, buttonText, buttonLink, dark = true }: CTASectionProps) {
  return (
    <section className={`py-20 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <h2 
          className={`mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}
        >
          {title}
        </h2>
        {description && (
          <p 
            className={`max-w-2xl mx-auto mb-8 ${dark ? 'text-white/80' : 'text-gray-600'}`}
            style={{ fontSize: '18px', lineHeight: 1.6 }}
          >
            {description}
          </p>
        )}
        <a
          href={buttonLink}
          className={`inline-block px-10 py-4 transition-colors ${
            dark 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
          style={{ fontSize: '16px', fontWeight: 600 }}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}

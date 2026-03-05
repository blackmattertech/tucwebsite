import React from 'react';
import { Link } from 'react-router';
import { useContactModal } from '../context/ContactModalContext';

export function Footer() {
  const modal = useContactModal();
  const footerLinks = {
    company: [
      { label: 'About Manufacturer', href: '/about-apparel-manufacturer-bangalore' },
      { label: 'Manufacturing Capabilities', href: '/capabilities' },
      { label: 'Private Label Services', href: '/capabilities/private-label-clothing-manufacturer' }
    ],
    products: [
      { label: 'T-Shirt Manufacturer Bangalore', href: '/products/t-shirt-manufacturer-bangalore' },
      { label: 'Hoodie Manufacturer India', href: '/products/hoodie-manufacturer-india' },
      { label: 'Shirt Manufacturer Bangalore', href: '/products/shirt-manufacturer-bangalore' }
    ],
    resources: [
      { label: 'Blog', href: '/blog-apparel-manufacturing-guides' },
      { label: 'Manufacturing Guides', href: '/blog-apparel-manufacturing-guides' },
      { label: 'Contact', href: '/contact-apparel-manufacturer-bangalore' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
          {/* Company */}
          <div>
            <Link to="/" className="mb-4 md:mb-6 block inline-block">
              <img
                src="/logo.svg"
                alt="TAG UNLIMITED - Private Label Apparel Manufacturer Bangalore"
                className="h-8 md:h-10 w-auto brightness-0 invert"
                width={120}
                height={40}
              />
            </Link>
            <h3 className="text-white mb-3 md:mb-4" style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 600 }}>
              Company
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                    style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 600 }}>
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                    style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 600 }}>
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.label === 'Contact' && modal?.openModal ? (
                    <button
                      type="button"
                      onClick={modal.openModal}
                      className="text-white/70 hover:text-white transition-colors text-left"
                      style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)' }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                      style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)' }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: 'clamp(0.9rem, 1vw, 1rem)', fontWeight: 600 }}>
              Contact
            </h3>
            <div className="space-y-3">
              <p className="text-white/70" style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)', lineHeight: 1.6 }}>
                Bangalore<br />
                Karnataka<br />
                India
              </p>
              <div>
                <a
                  href="mailto:contact@apparelmfg.com"
                  className="text-white/70 hover:text-white transition-colors"
                  style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)' }}
                >
                  contact@apparelmfg.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-center md:text-left" style={{ fontSize: '14px' }}>
              © 2026 Apparel Manufacturing. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-white/60 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Privacy Policy
              </Link>
              <Link to="#" className="text-white/60 hover:text-white transition-colors" style={{ fontSize: '14px' }}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Company Signature - TAG UNLIMITED in black with spotlight (hover → logo yellow) */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="bg-white rounded-sm py-4 px-6 flex items-center justify-center gap-3 group cursor-default">
            <img
              src="/logo.svg"
              alt="TAG UNLIMITED - Private Label Apparel Manufacturer Bangalore"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              width={96}
              height={32}
            />
            <span
              className="text-black font-bold tracking-tight transition-colors duration-300 group-hover:text-[#fecc00]"
              style={{ fontSize: '1.25rem', fontWeight: 700 }}
            >
              TAG UNLIMITED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
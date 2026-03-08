import React, { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { useContactModal } from '../context/ContactModalContext';
import { PRODUCT_CAROUSEL_ITEMS } from './ProductCarouselSection';
import './Footer.css';

export function Footer() {
  const modal = useContactModal();
  const signatureRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: '50%', y: '50%' });
  const [isSignatureHovered, setIsSignatureHovered] = useState(false);

  const handleSignatureMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = signatureRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlight({ x: `${x}px`, y: `${y}px` });
    },
    []
  );

  const handleSignatureMouseLeave = useCallback(() => {
    setIsSignatureHovered(false);
    setSpotlight({ x: '50%', y: '50%' });
  }, []);

  const handleSignatureMouseEnter = useCallback(() => {
    setIsSignatureHovered(true);
  }, []);

  /* Navigation column – main sitemap (subset) */
  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about-apparel-manufacturer-bangalore' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Manufacturing', href: '/capabilities/apparel-manufacturing-bangalore' },
    { label: 'Private Label', href: '/capabilities/private-label-clothing-manufacturer' },
    { label: 'Products', href: '/products' },
    { label: 'Blog', href: '/blog-apparel-manufacturing-guides' }
  ];

  /* Product names from carousel video labels; link to product page where we have one, else /products */
  const productLinks = PRODUCT_CAROUSEL_ITEMS.map((item) => {
    const href =
      item.id === 'tshirts'
        ? '/products/t-shirt-manufacturer-bangalore'
        : item.id === 'hoodies'
          ? '/products/hoodie-manufacturer-india'
          : item.id === 'denim-shirt' || item.id === 'formal-shirt'
            ? '/products/shirt-manufacturer-bangalore'
            : '/products';
    return { label: item.label, href };
  });

  const blogLinks = [
    { label: 'Private Label Manufacturing Process', href: '/blog/private-label-manufacturing-process' },
    { label: 'Clothing Manufacturer in India Guide', href: '/blog/clothing-manufacturer-india-guide' },
    { label: 'Best Fabric for T-Shirts', href: '/blog/best-fabric-for-tshirts' },
    { label: 'Minimum Order Quantities Explained', href: '/blog-apparel-manufacturing-guides' },
    { label: 'Quality Control in Garment Manufacturing', href: '/blog-apparel-manufacturing-guides' },
    { label: 'Sustainable Apparel Manufacturing', href: '/blog-apparel-manufacturing-guides' },
    { label: 'Custom Branding for Private Label', href: '/blog-apparel-manufacturing-guides' }
  ];

  /* High-SEO keywords potential customers search for – link to relevant pages */
  const seoKeywordLinks = [
    { label: 'Private label clothing manufacturer Bangalore', href: '/capabilities/private-label-clothing-manufacturer' },
    { label: 'Cap manufacturer in India', href: '/products' },
    { label: 'T-shirt manufacturer Bangalore', href: '/products/t-shirt-manufacturer-bangalore' },
    { label: 'Hoodie manufacturer India', href: '/products/hoodie-manufacturer-india' },
    { label: 'Bulk apparel manufacturer', href: '/capabilities' },
    { label: 'Custom clothing manufacturer India', href: '/about-apparel-manufacturer-bangalore' }
  ];

  const footerLinks = {
    social: [
      { label: 'Facebook', href: 'https://www.facebook.com/' },
      { label: 'Instagram', href: 'https://www.instagram.com/' },
      { label: 'YouTube', href: 'https://www.youtube.com/' }
    ]
  };

  const contactEmail = 'care@tagunlimitedclothing.com';
  const contactPhone = '+91 80952 12121';
  const contactAddress = 'Bangalore, Karnataka, India';

  return (
    <footer className="footer-root bg-black text-white pt-12 md:pt-16 pb-6 md:pb-8 w-full">
      <div className="footer-content-wrap w-full">
        <div className="footer-content-inner w-full px-4 sm:px-6 lg:px-12 xl:px-16">
          {/* Four columns – reference style: uppercase grey headings, larger white links, generous spacing */}
          <div className="footer-columns grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-12 lg:gap-16 mb-14 md:mb-16">
            {/* Navigation – full sitemap */}
            <div className="footer-col">
              <h3 className="footer-col-heading">Navigation</h3>
              <ul className="footer-col-list">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-col-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products – same names as product carousel video labels */}
            <div className="footer-col">
              <h3 className="footer-col-heading">Products</h3>
              <ul className="footer-col-list">
                {productLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-col-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blogs */}
            <div className="footer-col">
              <h3 className="footer-col-heading">Blogs</h3>
              <ul className="footer-col-list">
                {blogLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-col-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources – high-SEO keywords for discoverability */}
            <div className="footer-col">
              <h3 className="footer-col-heading">Resources</h3>
              <ul className="footer-col-list">
                {seoKeywordLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-col-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="footer-col">
              <h3 className="footer-col-heading">Social</h3>
              <ul className="footer-col-list">
                {footerLinks.social.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-col-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact – with icons */}
            <div className="footer-col">
              <h3 className="footer-col-heading">Contact</h3>
              <ul className="footer-col-list footer-contact-list">
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </span>
                  <a href={`mailto:${contactEmail}`} className="footer-col-link">
                    {contactEmail}
                  </a>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </span>
                  <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="footer-col-link">
                    {contactPhone}
                  </a>
                </li>
                <li className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  </span>
                  <span className="footer-col-link footer-contact-text">{contactAddress}</span>
                </li>
              </ul>
            </div>
          </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-white/60 text-center md:text-left"
              style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--text-footer)' }}
            >
              © 2026 Apparel Manufacturing. All rights reserved.
            </p>
            <p
              className="text-white/60 text-center md:text-right"
              style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--text-footer)' }}
            >
              Powered by BlackMatter Technologies
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Logo + TAG UNLIMITED text – full width signature block */}
      <div className="footer-signature">
        <Link to="/" className="footer-signature-logo-link">
          <img
            src="/logo.svg"
            alt="TAG UNLIMITED - Private Label Apparel Manufacturer Bangalore"
            className="footer-signature-logo"
            width={280}
            height={120}
            decoding="async"
          />
        </Link>
        <div
          ref={signatureRef}
          className={`footer-signature-text-wrap ${isSignatureHovered ? 'is-hovered' : ''}`}
          onMouseMove={handleSignatureMouseMove}
          onMouseEnter={handleSignatureMouseEnter}
          onMouseLeave={handleSignatureMouseLeave}
          role="presentation"
        >
          <span className="footer-signature-text-base" aria-hidden>
            TAG UNLIMITED
          </span>
          <span
            className="footer-signature-text-spotlight"
            style={
              {
                '--spotlight-x': spotlight.x,
                '--spotlight-y': spotlight.y,
              } as React.CSSProperties
            }
            aria-hidden
          >
            TAG UNLIMITED
          </span>
        </div>
      </div>
    </footer>
  );
}
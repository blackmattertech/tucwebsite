import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { PillNav } from './PillNav';
import { HeaderSocial } from './HeaderSocial';

const CATALOGUE_PDF = '/tshirt%20manufacturing%20hoodies%20manufacturing%20catalogue.pdf';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-apparel-manufacturer-bangalore' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog-apparel-manufacturing-guides' },
  { label: 'Catalogue', href: CATALOGUE_PDF, download: true },
];

const LOGO_YELLOW = '#fecc00';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pillNavProps = useMemo(
    () => ({
      baseColor: 'transparent',
      pillColor: 'transparent',
      pillTextColor: isScrolled ? '#111827' : '#fff',
      hoveredPillTextColor: LOGO_YELLOW,
    }),
    [isScrolled]
  );

  const linkClass = isScrolled
    ? 'text-gray-900 hover:text-gray-700'
    : 'text-white hover:text-white/90';
  const btnPrimaryClass = isScrolled
    ? 'bg-gray-900 text-white hover:bg-gray-800'
    : 'bg-white text-gray-900 hover:bg-white/90';
  const btnSecondaryClass = isScrolled
    ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
    : 'border-white text-white hover:bg-white hover:text-gray-900';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-black/20 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3 md:gap-4">
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="TAG UNLIMITED - Private Label Apparel Manufacturer Bangalore"
              className="h-12 w-auto md:h-14 lg:h-16"
              width={160}
              height={56}
            />
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <PillNav items={NAV_ITEMS} {...pillNavProps} />
            <HeaderSocial lightBackground={isScrolled} />
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <PillNav items={NAV_ITEMS} {...pillNavProps} />
          </div>
        </div>
      </div>
    </header>
  );
}

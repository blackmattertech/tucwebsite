import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { HeaderSocial } from './HeaderSocial';
import { MobileNav } from './MobileNav';
import { useViewport } from '../context/ViewportContext';
import { CatalogueSidebar } from './CatalogueSidebar';

/** Loaded only on desktop – avoids GSAP and heavy PillNav on mobile. */
const PillNavLazy = lazy(() =>
  import('./PillNav').then((m) => ({ default: m.PillNav }))
);

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-apparel-manufacturer-bangalore' },
  { label: 'Capabilities', href: '/capabilities/best-tshirt-manufacturer-in-india' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog-apparel-manufacturing-guides' },
];

const PILL_NAV_ITEMS = NAV_ITEMS;

const LOGO_YELLOW = '#fecc00';

export function Header() {
  const { isDesktop, ready } = useViewport();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

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

  const showDesktopNav = ready && isDesktop;

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
              srcSet="/logo.svg 1x, /logo.svg 2x"
              alt="Tag Unlimited – Private Label Apparel Manufacturer Bangalore"
              className="h-12 w-auto md:h-14 lg:h-16"
              width={160}
              height={56}
              decoding="async"
            />
          </Link>

          {showDesktopNav ? (
            <div className="flex items-center gap-4">
              <Suspense fallback={<div className="h-10 w-64" aria-hidden />}>
                <PillNavLazy items={PILL_NAV_ITEMS} {...pillNavProps} />
              </Suspense>
              <button
                type="button"
                onClick={() => setIsCatalogueOpen(true)}
                className="hidden md:inline-flex items-center rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-[#fecc00] hover:bg-[#fecc00]"
              >
                Catalogue
              </button>
              <HeaderSocial lightBackground={isScrolled} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MobileNav
                items={NAV_ITEMS}
                onOpenCatalogue={() => setIsCatalogueOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
      <CatalogueSidebar isOpen={isCatalogueOpen} onClose={() => setIsCatalogueOpen(false)} />
    </header>
  );
}

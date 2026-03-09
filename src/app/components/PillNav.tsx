import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router';
import { Facebook, Instagram, Youtube, X } from 'lucide-react';
import { gsap } from 'gsap';
import './PillNav.css';
import { useContactModal } from '../context/useContactModal';

const MOBILE_MENU_SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook, brand: 'facebook' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram, brand: 'instagram' as const },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: Youtube, brand: 'youtube' as const },
];

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  /** When true, render as download link (e.g. PDF). */
  download?: boolean;
}

export interface PillNavProps {
  items: PillNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

export function PillNav({
  items,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const location = useLocation();
  const activeHref = location.pathname;
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const modal = useContactModal();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = () => toggleMobileMenu();

  useEffect(() => {
    const layout = () => {
      if (cancelled) return;
      try {
        circleRefs.current.forEach((circle, index) => {
          if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
      } catch (e) {
        if (import.meta.env.DEV) console.warn('[PillNav layout]', e);
      }
    };

    let cancelled = false;
    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) layout();
      }).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation && navItemsRef.current) {
      gsap.set(navItemsRef.current, { width: 0, overflow: 'hidden' });
      gsap.to(navItemsRef.current, {
        width: 'auto',
        duration: 0.6,
        ease,
      });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      gsap.killTweensOf(navItemsRef.current);
      tlRefs.current.forEach((tl) => tl?.kill());
      tlRefs.current = [];
      activeTweenRefs.current.forEach((t) => t?.kill());
      activeTweenRefs.current = [];
      if (mobileMenuRef.current) gsap.killTweensOf(mobileMenuRef.current);
      if (hamburgerRef.current) gsap.killTweensOf(hamburgerRef.current);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    }) as gsap.core.Tween;
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    }) as gsap.core.Tween;
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      const transformOrigin = isMobile ? 'top right' : 'top center';
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: transformOrigin,
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: transformOrigin,
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href: string, item?: PillNavItem) =>
    href && !isExternalLink(href) && !item?.download;

  const cssVars: React.CSSProperties = {
    ['--base' as string]: baseColor,
    ['--pill-bg' as string]: pillColor,
    ['--hover-text' as string]: hoveredPillTextColor,
    ['--pill-text' as string]: resolvedPillTextColor,
  };

  return (
    <div className="pill-nav-wrapper">
      <nav className={`pill-nav pill-nav--no-logo ${className}`} aria-label="Primary" style={cssVars}>
        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                {isRouterLink(item.href, item) ? (
                  <Link
                    role="menuitem"
                    to={item.href}
                    className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`pill${activeHref === item.href ? ' is-active' : ''}`}
                    aria-label={item.ariaLabel || item.label}
                    {...(item.download ? { download: true } : {})}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      {createPortal(
        <div
          className={`mobile-menu-overlay mobile-only${isMobileMenuOpen ? ' is-open' : ''}`}
          ref={mobileMenuRef}
          style={cssVars}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="mobile-menu-backdrop" onClick={handleBackdropClick} aria-hidden />
          <div className="mobile-menu-top-bar">
            <Link to="/" className="mobile-menu-logo" onClick={toggleMobileMenu}>
              <img src="/logo.svg" alt="TAG UNLIMITED" className="mobile-menu-logo-img" width={120} height={42} />
            </Link>
            <button
              type="button"
              className="mobile-menu-close"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2} aria-hidden />
            </button>
          </div>
          <div className="mobile-menu-panel" ref={mobileMenuPanelRef}>
            <nav className="mobile-menu-nav">
              <ul className="mobile-menu-list navbar-nav">
                {items.map((item) => (
                  <li key={item.href || `mobile-item-${item.label}`} className="nav-item">
                    {isRouterLink(item.href, item) ? (
                      <Link
                        to={item.href}
                        className={`mobile-menu-link nav-link${activeHref === item.href ? ' active' : ''}`}
                        onClick={toggleMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`mobile-menu-link nav-link${activeHref === item.href ? ' active' : ''}`}
                        {...(item.download ? { download: true } : {})}
                        onClick={toggleMobileMenu}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              {modal?.openModal ? (
                <button
                  type="button"
                  className="mobile-menu-contact-btn"
                  onClick={() => {
                    toggleMobileMenu();
                    modal.openModal();
                  }}
                  aria-label="Contact us"
                >
                  Contact
                </button>
              ) : (
                <Link
                  to="/contact-apparel-manufacturer-bangalore"
                  className="mobile-menu-contact-btn"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </Link>
              )}
              <div className="mobile-menu-social">
              <span className="mobile-menu-social-label">Follow us</span>
              <div className="mobile-menu-social-icons">
                {MOBILE_MENU_SOCIAL.map(({ label, href, Icon, brand }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mobile-menu-social-link mobile-menu-social-link--${brand}`}
                    aria-label={label}
                  >
                    <Icon size={22} strokeWidth={2} aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

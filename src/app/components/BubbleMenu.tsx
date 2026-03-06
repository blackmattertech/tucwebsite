import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router';
import { gsap } from 'gsap';

import './BubbleMenu.css';

export interface BubbleMenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor: string; textColor: string };
}

export interface BubbleMenuProps {
  logo?: React.ReactNode | string | null;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items: BubbleMenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  showLogo?: boolean;
}

function isInternalHref(href: string) {
  return (
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !href.startsWith('http://') &&
    !href.startsWith('https://') &&
    !href.startsWith('mailto:') &&
    !href.startsWith('tel:') &&
    !href.startsWith('#')
  );
}

export function BubbleMenu({
  logo = null,
  onMenuClick,
  className = '',
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  showLogo = true,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const containerClassName = [
    'bubble-menu',
    useFixedPosition ? 'fixed' : 'absolute',
    !showLogo && 'bubble-menu--toggle-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out',
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in',
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        },
      });
    }
  }, [
    isMenuOpen,
    showOverlay,
    animationEase,
    animationDuration,
    staggerDelay,
    items?.length,
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = items[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, items]);

  const linkContent = (item: BubbleMenuItem, idx: number) => (
    <>
      <span
        className="pill-label"
        ref={(el) => {
          if (el) labelRefs.current[idx] = el;
        }}
      >
        {item.label}
      </span>
    </>
  );

  return (
    <>
      <nav
        className={containerClassName}
        style={style}
        aria-label="Main navigation"
      >
        {showLogo && (
          <div
            className="bubble logo-bubble"
            aria-label="Logo"
            style={{ background: menuBg }}
          >
            <span className="logo-content">
              {typeof logo === 'string' ? (
                <img src={logo} alt="Logo" className="bubble-logo" width={120} height={40} />
              ) : (
                logo
              )}
            </span>
          </div>
        )}

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span
            className="menu-line short"
            style={{ background: menuContentColor }}
          />
        </button>
      </nav>
      {showOverlay &&
        (useFixedPosition
          ? createPortal(
              <div
                ref={overlayRef}
                className="bubble-menu-items fixed"
                aria-hidden={!isMenuOpen}
              >
                <ul className="pill-list" role="menu" aria-label="Menu links">
                  {items.map((item, idx) => (
                    <li key={item.href || idx} role="none" className="pill-col">
                      {isInternalHref(item.href) ? (
                        <Link
                          role="menuitem"
                          to={item.href}
                          aria-label={item.ariaLabel || item.label}
                          className="pill-link"
                          style={
                            {
                              '--item-rot': `${item.rotation ?? 0}deg`,
                              '--pill-bg': menuBg,
                              '--pill-color': menuContentColor,
                              '--hover-bg':
                                item.hoverStyles?.bgColor ??
                                'rgba(254, 204, 0, 0.25)',
                              '--hover-color':
                                item.hoverStyles?.textColor ?? menuContentColor,
                            } as React.CSSProperties
                          }
                          ref={(el) => {
                            if (el)
                              bubblesRef.current[idx] = el as HTMLAnchorElement;
                          }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {linkContent(item, idx)}
                        </Link>
                      ) : (
                        <a
                          role="menuitem"
                          href={item.href}
                          aria-label={item.ariaLabel || item.label}
                          className="pill-link"
                          style={
                            {
                              '--item-rot': `${item.rotation ?? 0}deg`,
                              '--pill-bg': menuBg,
                              '--pill-color': menuContentColor,
                              '--hover-bg':
                                item.hoverStyles?.bgColor ??
                                'rgba(254, 204, 0, 0.25)',
                              '--hover-color':
                                item.hoverStyles?.textColor ?? menuContentColor,
                            } as React.CSSProperties
                          }
                          ref={(el) => {
                            if (el) bubblesRef.current[idx] = el;
                          }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {linkContent(item, idx)}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>,
              document.body
            )
          : (
            <div
              ref={overlayRef}
              className="bubble-menu-items absolute"
              aria-hidden={!isMenuOpen}
            >
              <ul className="pill-list" role="menu" aria-label="Menu links">
                {items.map((item, idx) => (
                  <li key={item.href || idx} role="none" className="pill-col">
                    {isInternalHref(item.href) ? (
                      <Link
                        role="menuitem"
                        to={item.href}
                        aria-label={item.ariaLabel || item.label}
                        className="pill-link"
                        style={
                          {
                            '--item-rot': `${item.rotation ?? 0}deg`,
                            '--pill-bg': menuBg,
                            '--pill-color': menuContentColor,
                            '--hover-bg':
                              item.hoverStyles?.bgColor ??
                              'rgba(254, 204, 0, 0.25)',
                            '--hover-color':
                              item.hoverStyles?.textColor ?? menuContentColor,
                          } as React.CSSProperties
                        }
                        ref={(el) => {
                          if (el)
                            bubblesRef.current[idx] = el as HTMLAnchorElement;
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {linkContent(item, idx)}
                      </Link>
                    ) : (
                      <a
                        role="menuitem"
                        href={item.href}
                        aria-label={item.ariaLabel || item.label}
                        className="pill-link"
                        style={
                          {
                            '--item-rot': `${item.rotation ?? 0}deg`,
                            '--pill-bg': menuBg,
                            '--pill-color': menuContentColor,
                            '--hover-bg':
                              item.hoverStyles?.bgColor ??
                              'rgba(254, 204, 0, 0.25)',
                            '--hover-color':
                              item.hoverStyles?.textColor ?? menuContentColor,
                          } as React.CSSProperties
                        }
                        ref={(el) => {
                          if (el) bubblesRef.current[idx] = el;
                        }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {linkContent(item, idx)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </>
  );
}

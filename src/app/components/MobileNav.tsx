import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router';
import { Facebook, Instagram, Youtube, X } from 'lucide-react';
import { useContactModal } from '../context/useContactModal';
import './MobileNav.css';

const MOBILE_MENU_SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook, brand: 'facebook' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram, brand: 'instagram' as const },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: Youtube, brand: 'youtube' as const },
];

export interface MobileNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
  download?: boolean;
}

export interface MobileNavProps {
  items: MobileNavItem[];
}

function isExternalLink(href: string) {
  return /^(https?:|\/\/|mailto:|tel:|#)/.test(href);
}

function isRouterLink(href: string, item?: MobileNavItem) {
  return href && !isExternalLink(href) && !item?.download;
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const modal = useContactModal();
  const activeHref = location.pathname;

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        className="mobile-nav-hamburger"
        onClick={toggle}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span className="mobile-nav-hamburger-line" />
        <span className="mobile-nav-hamburger-line" />
      </button>

      {createPortal(
        <div
          className={`mobile-nav-overlay${open ? ' is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="mobile-nav-backdrop" onClick={close} aria-hidden />
          <div className="mobile-nav-top-bar">
            <Link to="/" className="mobile-nav-logo" onClick={close}>
              <img src="/logo.svg" srcSet="/logo.svg 1x, /logo.svg 2x" alt="Tag Unlimited" className="mobile-nav-logo-img" width={120} height={42} />
            </Link>
            <button
              type="button"
              className="mobile-nav-close"
              onClick={close}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2} aria-hidden />
            </button>
          </div>
          <div className="mobile-nav-panel">
            <nav className="mobile-nav-nav">
              <ul className="mobile-nav-list">
                {items.map((item) => (
                  <li key={item.href || item.label}>
                    {isRouterLink(item.href, item) ? (
                      <Link
                        to={item.href}
                        className={`mobile-nav-link${activeHref === item.href ? ' active' : ''}`}
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className={`mobile-nav-link${activeHref === item.href ? ' active' : ''}`}
                        {...(item.download ? { download: true } : {})}
                        onClick={close}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="mobile-nav-contact-btn mobile-nav-contact-btn--highlighted"
                onClick={() => {
                  close();
                  modal?.openModal?.();
                }}
                aria-label="Contact us"
              >
                Contact
              </button>
              <div className="mobile-nav-social">
                <span className="mobile-nav-social-label">Follow us</span>
                <div className="mobile-nav-social-icons">
                  {MOBILE_MENU_SOCIAL.map(({ label, href, Icon, brand }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mobile-nav-social-link mobile-nav-social-link--${brand}`}
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
    </>
  );
}

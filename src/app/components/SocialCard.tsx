import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import './SocialCard.css';

const SOCIAL_LINKS = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/tagunlimited',
    Icon: Facebook,
    hoverColor: '#1877f2',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/tagunlimited',
    Icon: Instagram,
    hoverGradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@tagunlimited',
    Icon: Youtube,
    hoverColor: '#ff0000',
  },
] as const;

export function SocialCard() {
  return (
    <div className="social-card">
      <div className="social-card__spotlight" aria-hidden />
      <div className="social-card__glass">
        <span className="social-card__label">Social</span>
        <div className="social-card__icons">
          {SOCIAL_LINKS.map(({ id, label, href, Icon, hoverColor, hoverGradient }, index) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-card__icon social-card__icon--${index + 1}`}
              aria-label={label}
              style={
                {
                  '--social-icon-hover-color': hoverColor,
                  '--social-icon-hover-gradient': hoverGradient,
                } as React.CSSProperties
              }
            >
              <span className="social-card__icon-inner">
                <Icon className="social-card__icon-svg" size={22} strokeWidth={2} aria-hidden />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

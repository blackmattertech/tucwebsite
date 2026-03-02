import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import './HeaderSocial.css';

const LOGO_YELLOW = '#fecc00';
const LOGO_LIGHT = '#fef08a';
const LOGO_LIGHTER = '#fef9c3';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: Youtube },
];

export interface HeaderSocialProps {
  lightBackground?: boolean;
}

export function HeaderSocial({ lightBackground = false }: HeaderSocialProps) {
  const iconColor = lightBackground ? '#b45309' : LOGO_LIGHT;
  return (
    <div
      className="header-social"
      data-light={lightBackground ? 'true' : undefined}
      style={{
        ['--header-social-color' as string]: iconColor,
        ['--header-social-hover' as string]: LOGO_YELLOW,
        ['--header-social-bg' as string]: LOGO_LIGHTER,
      }}
    >
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="header-social__link"
          aria-label={label}
        >
          <Icon className="header-social__icon" size={20} strokeWidth={2} aria-hidden />
        </a>
      ))}
    </div>
  );
}

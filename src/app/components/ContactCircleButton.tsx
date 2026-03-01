import React from 'react';
import { Link } from 'react-router';
import { useContactModal } from '../context/ContactModalContext';
import { CircularText } from './CircularText';
import './ContactCircleButton.css';

const CONTACT_HREF = '/contact-apparel-manufacturer-bangalore';

const CIRCLE_SIZE = 96;
const TEXT_RADIUS = 38;

export type ContactCircleButtonVariant = 'default' | 'cta';

export function ContactCircleButton({ variant = 'default' }: { variant?: ContactCircleButtonVariant }) {
  const modal = useContactModal();
  const isCta = variant === 'cta';
  const circularText = isCta
    ? 'contact us . contact us . '
    : 'CONTACT US . CONTACT US . ';

  const className = `contact-circle-btn ${isCta ? 'contact-circle-btn--cta' : ''}`;

  const inner = (
    <>
      {!isCta && <span className="contact-circle-btn__glow" aria-hidden />}
      <span className="contact-circle-btn__inner">
        <span className="contact-circle-btn__text">
          <CircularText
            text={circularText}
            spinDuration={10}
            onHover="speedUp"
            className="contact-circle-btn__circular-text"
            radius={TEXT_RADIUS}
            size={CIRCLE_SIZE}
          />
        </span>
        <svg
          className="contact-circle-btn__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={isCta ? 2.25 : 2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {isCta ? (
            <path d="M5 12h14M12 5l7 7-7 7" />
          ) : (
            <path d="M7 17L17 7M17 7h-8M17 7v8" />
          )}
        </svg>
      </span>
    </>
  );

  if (modal?.openModal) {
    return (
      <button
        type="button"
        className={className}
        aria-label="Contact us"
        onClick={modal.openModal}
      >
        {inner}
      </button>
    );
  }

  return (
    <Link to={CONTACT_HREF} className={className} aria-label="Contact us">
      {inner}
    </Link>
  );
}

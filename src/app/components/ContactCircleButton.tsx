import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useContactModal } from '../context/ContactModalContext';
import { CircularText } from './CircularText';
import './ContactCircleButton.css';

const CONTACT_HREF = '/contact-apparel-manufacturer-bangalore';

const CIRCLE_SIZE = 110;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
const TEXT_RADIUS = CIRCLE_RADIUS - 14;
const CIRCLE_SIZE_MOBILE = 68;
const TEXT_RADIUS_MOBILE = CIRCLE_SIZE_MOBILE / 2 - 2;

export type ContactCircleButtonVariant = 'default' | 'cta';

const MOBILE_MAX_WIDTH = 640;

export function ContactCircleButton({ variant = 'default' }: { variant?: ContactCircleButtonVariant }) {
  const modal = useContactModal();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_MAX_WIDTH
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const handle = () => setIsMobile(mq.matches);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  const isCta = variant === 'cta';
  const circularText = isCta
    ? 'CONTACT US * CONTACT US *'
    : 'CONTACT US * CONTACT US *';
  const textRadius = isMobile ? TEXT_RADIUS_MOBILE : TEXT_RADIUS;
  const circleSize = isMobile ? CIRCLE_SIZE_MOBILE : CIRCLE_SIZE;

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
            radius={textRadius}
            size={circleSize}
            fontSize={isMobile ? 8 : undefined}
            useSvgPath
          />
        </span>
        <svg
          className="contact-circle-btn__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
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

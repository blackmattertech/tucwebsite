import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useContactModal } from '../context/useContactModal';
import { useViewport } from '../context/ViewportContext';
import './ContactCircleButton.css';

/** Lazy-loaded so the contact button renders quickly; CircularText shows on both mobile and desktop. */
const CircularTextLazy = lazy(() =>
  import('./CircularText').then((m) => ({ default: m.CircularText }))
);

const CIRCLE_SIZE = 110;
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
const TEXT_RADIUS = CIRCLE_RADIUS - 14;
const CIRCLE_SIZE_MOBILE = 68;
/** Slightly inset so circular text stays inside the button on small viewports */
const TEXT_RADIUS_MOBILE = CIRCLE_SIZE_MOBILE / 2 - 6;

export type ContactCircleButtonVariant = 'default' | 'cta';

const MOBILE_MAX_WIDTH = 640;

export function ContactCircleButton({ variant = 'default' }: { variant?: ContactCircleButtonVariant }) {
  const modal = useContactModal();
  const { ready } = useViewport();
  const [sizeMobile, setSizeMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_MAX_WIDTH
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const handle = () => setSizeMobile(mq.matches);
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  const isCta = variant === 'cta';
  /* Repeat so text fills the full inner circumference on all viewports */
  const circularText = 'CONTACT US * CONTACT US * CONTACT US * CONTACT US * ';
  const textRadius = sizeMobile ? TEXT_RADIUS_MOBILE : TEXT_RADIUS;
  const circleSize = sizeMobile ? CIRCLE_SIZE_MOBILE : CIRCLE_SIZE;

  const className = `contact-circle-btn ${isCta ? 'contact-circle-btn--cta' : ''}`;

  const showCircularText = ready;

  const inner = (
    <>
      {!isCta && <span className="contact-circle-btn__glow" aria-hidden />}
      <span className="contact-circle-btn__inner">
        <span className="contact-circle-btn__text">
          {showCircularText ? (
            <Suspense fallback={<span>Contact</span>}>
              <CircularTextLazy
                text={circularText}
                spinDuration={10}
                onHover="speedUp"
                className="contact-circle-btn__circular-text"
                radius={textRadius}
                size={circleSize}
                fontSize={sizeMobile ? 7 : undefined}
                useSvgPath
              />
            </Suspense>
          ) : (
            <span>Contact</span>
          )}
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

  return (
    <button
      type="button"
      className={className}
      aria-label="Contact us"
      onClick={modal?.openModal ?? undefined}
    >
      {inner}
    </button>
  );
}

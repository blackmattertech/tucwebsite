import React, { useState, useRef, useCallback } from 'react';
import GlareHover from './GlareHover';
import './PrinciplesSection.css';

const LOGO_YELLOW = '#fecc00';
const SWIPE_THRESHOLD = 50;

const PRINCIPLES = [
  {
    title: 'Quality',
    description:
      'Quality and performance never happen by chance; they define every action we take. After all, excellence is the only thing that guarantees our long-term success.',
  },
  {
    title: 'Integrity',
    description:
      "We believe that strong moral principles must exist in any field of activity, and the quality of being honest and open with clients and potential clients defines us as a company.",
  },
  {
    title: 'The right price',
    description:
      'We pride ourselves on our ability to estimate and budget the services we provide, which we consider fair. You will not pay a little or a lot, cheap or expensive, but exactly what it is worth.',
  },
  {
    title: 'Innovation',
    description:
      "It's clear that innovation is part of our DNA. At TAG Unlimited Clothing, we believe that success belongs to the brave, which is why we are not afraid to implement visionary ideas from the future.",
  },
];

function PrincipleCard({
  item,
  isStack,
}: {
  item: (typeof PRINCIPLES)[0];
  isStack?: boolean;
}) {
  return (
    <GlareHover
      className={`principles-card-glare ${isStack ? 'principles-stack-card' : ''}`}
      width="100%"
      height="100%"
      background="#ffffff"
      borderRadius="12px"
      borderColor="rgba(0,0,0,0.08)"
      glareColor={LOGO_YELLOW}
      glareOpacity={0.9}
      glareAngle={-30}
      glareSize={200}
      transitionDuration={1200}
      playOnce={false}
    >
      <article className="principles-card">
        <h3 className="principles-card-title">{item.title}</h3>
        <p className="principles-card-description">{item.description}</p>
      </article>
    </GlareHover>
  );
}

export const PrinciplesSection = React.memo(function PrinciplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(PRINCIPLES.length - 1, index));
    setActiveIndex(next);
    setDragOffset(0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setDragOffset(0);
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    setDragOffset(dx);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null) return;
    setIsDragging(false);
    if (dragOffset > SWIPE_THRESHOLD && activeIndex > 0) {
      goTo(activeIndex - 1);
    } else if (dragOffset < -SWIPE_THRESHOLD && activeIndex < PRINCIPLES.length - 1) {
      goTo(activeIndex + 1);
    } else {
      setDragOffset(0);
    }
    touchStartX.current = null;
  }, [activeIndex, dragOffset, goTo]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    setDragOffset(0);
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.clientX - touchStartX.current;
      setDragOffset(dx);
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    if (touchStartX.current === null) return;
    setIsDragging(false);
    if (dragOffset > SWIPE_THRESHOLD && activeIndex > 0) {
      goTo(activeIndex - 1);
    } else if (dragOffset < -SWIPE_THRESHOLD && activeIndex < PRINCIPLES.length - 1) {
      goTo(activeIndex + 1);
    } else {
      setDragOffset(0);
    }
    touchStartX.current = null;
  }, [activeIndex, dragOffset, goTo]);

  return (
    <section id="principles" className="principles-section" aria-labelledby="principles-heading">
      <header className="principles-header">
        <h2 id="principles-heading" className="principles-title">
          <span className="principles-title-accent">Four Principles</span>
          <span className="principles-title-main">We Never Get Bored Of Talking About</span>
        </h2>
      </header>

      {/* Mobile: card stack with swipe */}
      <div
        className="principles-mobile-stack"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className={`principles-stack-track ${isDragging ? 'principles-stack-dragging' : ''}`}
            style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {PRINCIPLES.map((item, index) => (
            <div key={index} className="principles-stack-slide">
              <PrincipleCard item={item} isStack />
                </div>
          ))}
        </div>
        <div className="principles-stack-dots" role="tablist" aria-label="Principles">
          {PRINCIPLES.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Principle ${index + 1}`}
              className={`principles-stack-dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid of cards */}
      <div className="principles-grid">
        {PRINCIPLES.map((item, index) => (
          <PrincipleCard key={index} item={item} />
        ))}
    </div>
    </section>
  );
});

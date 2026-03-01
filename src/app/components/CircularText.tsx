import React, { useEffect, useCallback } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';
import './CircularText.css';

const getRotationTransition = (
  duration: number,
  from: number,
  loop = true
) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0,
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  },
});

export interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown' | 'pause' | 'goBonkers' | false;
  className?: string;
  radius?: number;
  size?: number;
}

export function CircularText({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  radius = 100,
  size = 200,
}: CircularTextProps) {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, text, controls, rotation]);

  const handleHoverStart = useCallback(() => {
    if (!onHover) return;
    const start = rotation.get();

    let transitionConfig: ReturnType<typeof getTransition>;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = getTransition(1e6, start);
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    });
  }, [onHover, spinDuration, rotation, controls]);

  const handleHoverEnd = useCallback(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    });
  }, [spinDuration, rotation, controls]);

  return (
    <motion.div
      className={`circular-text ${className}`.trim()}
      style={{
        rotate: rotation,
        width: size,
        height: size,
      }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const angleDeg = (360 / letters.length) * i;
        const transform = `rotate(${angleDeg}deg) translateY(-${radius}px) rotate(${angleDeg}deg)`;

        if (letter === '.' || letter === '·') {
          return (
            <span
              key={`circle-${i}`}
              className="circular-text-circle"
              style={{
                transform,
                WebkitTransform: transform,
              }}
              aria-hidden
            />
          );
        }

        return (
          <span
            key={`${i}-${letter}`}
            className="circular-text-char"
            style={{
              transform,
              WebkitTransform: transform,
              fontSize: `${Math.max(12, (size / 200) * 22)}px`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
}

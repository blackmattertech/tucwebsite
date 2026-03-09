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
  /** Override font size (e.g. for mobile so circular text fits). */
  fontSize?: number;
  /** Use SVG textPath for even, readable circular text. Recommended. */
  useSvgPath?: boolean;
}

function CircularTextSvg({
  text,
  size,
  radius,
  fontSize,
  className,
  pathId,
}: {
  text: string;
  size: number;
  radius: number;
  fontSize: number;
  className: string;
  pathId: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const d = `M ${cx},${cy - radius} A ${radius},${radius} 0 1,1 ${cx},${cy + radius} A ${radius},${radius} 0 1,1 ${cx},${cy - radius}`;
  const pathLength = 2 * Math.PI * radius;

  return (
    <svg
      className={`circular-text-svg ${className}`.trim()}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      overflow="visible"
      aria-hidden
    >
      <defs>
        <path id={pathId} d={d} pathLength={pathLength} />
      </defs>
      <text
        className="circular-text-svg-text"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize={fontSize}
        textLength={pathLength}
        lengthAdjust="spacingAndGlyphs"
        xmlSpace="preserve"
      >
        <textPath href={`#${pathId}`} startOffset="0" xmlSpace="preserve">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

export function CircularText({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = '',
  radius = 100,
  size = 200,
  fontSize: fontSizeOverride,
  useSvgPath = false,
}: CircularTextProps) {
  const pathId = React.useId().replace(/:/g, '');
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
    return () => {
      (controls as { stop?: () => void }).stop?.();
    };
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

  const baseFontSize = fontSizeOverride ?? Math.max(11, (size / 200) * 20);

  if (useSvgPath) {
    return (
      <motion.div
        className={`circular-text circular-text--svg ${className}`.trim()}
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
        <CircularTextSvg
          text={text}
          size={size}
          radius={radius}
          fontSize={baseFontSize}
          className={className}
          pathId={pathId}
        />
      </motion.div>
    );
  }

  const isSeparator = (char: string) =>
    char === '.' || char === '·' || char === '•' || char === '—';

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

        if (isSeparator(letter)) {
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
              fontSize: `${baseFontSize}px`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
}

import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const CARD_EASE = [0.25, 0.46, 0.45, 0.94] as const;

type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
};

function TimelineItemComponent({ year, title, description, side }: TimelineItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });
  const smoothProgress = useSpring(cardProgress, { stiffness: 120, damping: 32 });

  const opacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7], [0.8, 1, 1]);
  const y = useTransform(smoothProgress, [0, 0.3], [80, 0]);
  const rotateX = useTransform(smoothProgress, [0, 0.3], [10, 0]);

  const yearOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);
  const yearY = useTransform(smoothProgress, [0.2, 0.4], [20, 0]);
  const titleOpacity = useTransform(smoothProgress, [0.25, 0.45], [0, 1]);
  const titleY = useTransform(smoothProgress, [0.25, 0.45], [20, 0]);
  const descOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const descY = useTransform(smoothProgress, [0.3, 0.5], [20, 0]);

  const stitchTLScale = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const stitchTLOpac = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const stitchTRScale = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
  const stitchTROpac = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
  const stitchBLScale = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const stitchBLOpac = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
  const stitchBRScale = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
  const stitchBROpac = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);

  const isLeft = side === 'left';

  return (
    <div
      ref={cardRef}
      className={`flex w-full justify-center [perspective:1000px] ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
    >
      <motion.article
        layout={false}
        className={`
          journey-card relative w-full max-w-[28rem] overflow-hidden rounded-xl border border-gray-100
          bg-white px-6 py-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]
          md:w-[45%] md:px-8 md:py-8
          ${isLeft ? 'md:ml-0 md:mr-auto md:pr-12' : 'md:ml-auto md:mr-0 md:pl-12'}
        `}
        style={{
          opacity,
          scale,
          y,
          rotateX,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(245, 158, 11, 0.25)',
        }}
        transition={{ duration: 0.3, ease: CARD_EASE }}
      >
        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-50/0 to-amber-100/0 transition-all duration-500 hover:from-amber-50/50 hover:to-amber-100/30"
          aria-hidden
        />

        {/* Corner stitches – L-shaped, amber-400 */}
        <motion.div
          className="absolute top-2 left-2 h-3 w-3 border-l-2 border-t-2 border-amber-400"
          style={{ scale: stitchTLScale, opacity: stitchTLOpac }}
        />
        <motion.div
          className="absolute top-2 right-2 h-3 w-3 border-r-2 border-t-2 border-amber-400"
          style={{ scale: stitchTRScale, opacity: stitchTROpac }}
        />
        <motion.div
          className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-amber-400"
          style={{ scale: stitchBLScale, opacity: stitchBLOpac }}
        />
        <motion.div
          className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-amber-400"
          style={{ scale: stitchBRScale, opacity: stitchBROpac }}
        />

        <div className="relative z-10">
          <motion.p
            className="mb-2 text-[1.875rem] font-bold md:mb-2 md:text-[2.25rem]"
            style={{
              opacity: yearOpacity,
              y: yearY,
              backgroundImage: 'linear-gradient(to right, #d97706, #92400e)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {year}
          </motion.p>
          <motion.h3
            className="mb-4 text-lg font-medium text-gray-800 md:mb-4 md:text-xl"
            style={{ opacity: titleOpacity, y: titleY }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-sm leading-relaxed text-gray-600 md:text-base"
            style={{ opacity: descOpacity, y: descY }}
          >
            {description}
          </motion.p>
        </div>
      </motion.article>
    </div>
  );
}

export const TimelineItem = memo(TimelineItemComponent);

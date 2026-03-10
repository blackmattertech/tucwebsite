import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

const STATS = [
  { target: 100000, suffix: '+', label: 'Pieces Manufactured Monthly' },
  { target: 3000, suffix: '+', label: 'Brands Served Globally' },
  { target: 200, suffix: '+', label: 'Industrial Machines' },
  { target: 20, suffix: '+', label: 'Years of Experience' },
];

function AnimatedCount({
  target,
  suffix,
  inView,
  delay = 0,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const duration = 1800;
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    startRef.current = null;
    setCount(0);
    let rafId: number;
    let cancelled = false;

    const tick = (timestamp: number) => {
      if (cancelled) return;
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [started, target]);

  const formatted = count.toLocaleString();
  return (
    <>
      {formatted}
      {suffix}
    </>
  );
}

export interface StatsCardsProps {
  /** Background color for each stat card (e.g. #fecc00 or #0f172a) */
  cardBgColor: string;
  /** Optional className for the grid wrapper */
  className?: string;
}

export const StatsCards = React.memo(function StatsCards({
  cardBgColor,
  className = '',
}: StatsCardsProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <div
      ref={statsRef}
      className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}
    >
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
          whileHover={{ scale: 1.05 }}
          className="p-4 sm:p-5 md:p-8 rounded-xl shadow-lg transition-shadow duration-300 stats-card"
          style={{ backgroundColor: cardBgColor }}
        >
          <div className="text-white font-black text-2xl sm:text-3xl md:text-5xl leading-tight mb-2">
            <AnimatedCount
              target={stat.target}
              suffix={stat.suffix}
              inView={statsInView}
              delay={i * 120}
            />
          </div>
          <div className="stats-card__label text-gray-700 font-medium text-xs sm:text-sm md:text-base">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

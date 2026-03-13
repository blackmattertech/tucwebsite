import { useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { TimelineItem } from './TimelineItem';
import './JourneySection.css';

const MILESTONES = [
  {
    year: '2006',
    title: 'Company Founded',
    description:
      'Tag Unlimited was established in Bangalore with the vision of supporting fashion brands with reliable apparel manufacturing. We started with a small team and a focus on quality stitching and on-time delivery for private label and bulk garment orders.',
  },
  {
    year: '2010',
    title: 'Production Expansion',
    description:
      'Expanded garment production capacity and strengthened our manufacturing infrastructure. New stitching lines and cutting facilities allowed us to serve more brands and take on larger bulk orders while maintaining consistent quality across T-shirts, hoodies, and custom apparel.',
  },
  {
    year: '2016',
    title: 'Modern Industrial Machines',
    description:
      'Introduced advanced sewing machines and improved production workflows. Investment in industrial equipment and trained operators helped us scale output and meet international quality standards for fashion brands and apparel businesses.',
  },
  {
    year: '2020',
    title: 'ERP Driven Manufacturing',
    description:
      'Implemented ERP production systems to monitor order stages and ensure delivery reliability. From sampling to bulk production and dispatch, every order is tracked so our clients have full visibility and dependable timelines.',
  },
  {
    year: '2024',
    title: 'Serving Brands Globally',
    description:
      'Supporting fashion brands and businesses across India and international markets. We continue to grow as a trusted apparel manufacturing partner for startups, corporates, and established brands looking for scalable, quality-driven production.',
  },
] as const;

/** Journey data for path: side per card (matches MILESTONES order) */
const JOURNEY_DATA = MILESTONES.map((_, i) => ({
  side: (i % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
}));

/**
 * Snake path per guide: quadratic Bézier (Q), control at midpoint.
 * Start center-top (50,0), curve to each card at X=20 (left) or X=80 (right),
 * transition back to center only when next card is on the other side.
 * viewBox 0 0 100 100.
 */
function getSnakePath(): string {
  const segments = JOURNEY_DATA.length;
  let path = 'M 50 0';

  for (let i = 0; i < segments; i++) {
    const y = ((i + 1) / segments) * 100;
    const prevY = (i / segments) * 100;
    const midY = (y + prevY) / 2;

    if (JOURNEY_DATA[i].side === 'left') {
      path += ` Q 20 ${midY} 20 ${y}`;
      if (i < segments - 1 && JOURNEY_DATA[i + 1].side === 'right') {
        const nextY = ((i + 2) / segments) * 100;
        const nextMidY = (y + nextY) / 2;
        path += ` Q 20 ${nextMidY} 50 ${nextMidY}`;
      }
    } else {
      path += ` Q 80 ${midY} 80 ${y}`;
      if (i < segments - 1 && JOURNEY_DATA[i + 1].side === 'left') {
        const nextY = ((i + 2) / segments) * 100;
        const nextMidY = (y + nextY) / 2;
        path += ` Q 80 ${nextMidY} 50 ${nextMidY}`;
      }
    }
  }

  return path;
}

const SNAKE_PATH = getSnakePath();

export function TimelineContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      className="journey-timeline-container relative w-full"
      style={{ contain: 'layout' }}
    >
      {/* SVG snake path – pathLength 0→1 as section scrolls; section ends at last card */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none overflow-visible journey-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Layer 1: Glow */}
        <motion.path
          d={SNAKE_PATH}
          fill="none"
          stroke="rgba(245, 158, 11, 0.2)"
          strokeWidth="0.5"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
            filter: 'blur(4px)',
            transform: 'translateZ(0)',
          }}
        />
        {/* Layer 2: Main thread */}
        <motion.path
          d={SNAKE_PATH}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="0.3"
          strokeDasharray="2 1.5"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
            transform: 'translateZ(0)',
          }}
        />
      </svg>

      {/* Cards – alternating left/right, gap 96px mobile / 128px desktop */}
      <div className="journey-cards relative flex flex-col gap-[6rem] py-12 md:gap-[8rem] md:py-16">
        {MILESTONES.map((item, i) => (
          <TimelineItem
            key={item.year}
            year={item.year}
            title={item.title}
            description={item.description}
            side={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  );
}

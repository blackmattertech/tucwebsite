import { motion } from 'motion/react';
import {
  BarChart3,
  Package,
  Scissors,
  ClipboardCheck,
  TrendingUp,
  Factory,
  Users,
  Truck,
  Target,
  type LucideIcon,
} from 'lucide-react';
import './ProductionIntelligenceLeft.css';

interface ProductionCardData {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const PRODUCTION_SCREENS: ProductionCardData[] = [
  { title: 'Production Dashboard', description: 'Real-time order visibility', icon: BarChart3, color: '#3b82f6' },
  { title: 'Material Planning', description: 'Automatic fabric allocation', icon: Package, color: '#10b981' },
  { title: 'Cutting Jobs', description: 'Batch-level tracking', icon: Scissors, color: '#f97316' },
  { title: 'Quality Control', description: 'Automated QC checkpoints', icon: ClipboardCheck, color: '#a855f7' },
  { title: 'Order Tracking', description: 'Live progress updates', icon: TrendingUp, color: '#f59e0b' },
  { title: 'Workflow Control', description: 'Task automation', icon: Factory, color: '#6366f1' },
  { title: 'Team Coordination', description: 'Department communication', icon: Users, color: '#f43f5e' },
  { title: 'Dispatch Tracking', description: 'Delivery scheduling', icon: Truck, color: '#14b8a6' },
  { title: 'Batch Monitoring', description: 'Production efficiency', icon: Target, color: '#8b5cf6' },
];

function ProductionCard({
  screen,
  index,
  isDesktop,
}: {
  screen: ProductionCardData;
  index: number;
  isDesktop: boolean;
}) {
  const Icon = screen.icon;
  return (
    <motion.div
      className="production-intel-card"
      initial={
        isDesktop
          ? { opacity: 0, scale: 0.9, y: 30 }
          : { opacity: 0, y: 20 }
      }
      animate={
        isDesktop
          ? { opacity: 1, scale: 1, y: 0 }
          : undefined
      }
      whileInView={!isDesktop ? { opacity: 1, y: 0 } : undefined}
      viewport={!isDesktop ? { once: true } : undefined}
      transition={{
        duration: isDesktop ? 0.5 : 0.4,
        delay: index * (isDesktop ? 0.08 : 0.05),
        ease: isDesktop ? [0.25, 0.46, 0.45, 0.94] : 'easeOut',
      }}
      whileHover={
        isDesktop
          ? { scale: 1.05, zIndex: 50, transition: { duration: 0.3 } }
          : undefined
      }
    >
      <span className="production-intel-card__badge">Active</span>
      <h4 className="production-intel-card__title">{screen.title}</h4>
      <p className="production-intel-card__desc">{screen.description}</p>
      <div
        className="production-intel-card__icon"
        style={{ backgroundColor: screen.color }}
        aria-hidden
      >
        <Icon className="production-intel-card__icon-svg" size={20} strokeWidth={2} />
      </div>
    </motion.div>
  );
}

export function ProductionIntelligenceLeft() {
  return (
    <div className="about-production-intelligence">
      <div className="about-production-intelligence__inner">
        <motion.div
          className="about-production-intelligence__header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="about-production-intelligence__title">Production Intelligence</h3>
          <p className="about-production-intelligence__subtitle">
            Our ERP-driven systems track every step of apparel manufacturing
          </p>
        </motion.div>

        {/* Desktop: scattered absolute layout */}
        <div className="about-production-intelligence__cards-desktop">
          {PRODUCTION_SCREENS.map((screen, index) => (
            <ProductionCard key={screen.title} screen={screen} index={index} isDesktop />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="about-production-intelligence__cards-mobile">
          {PRODUCTION_SCREENS.map((screen, index) => (
            <ProductionCard key={screen.title} screen={screen} index={index} isDesktop={false} />
          ))}
        </div>

        <motion.p
          className="about-production-intelligence__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          This digital production system ensures our customers receive high-quality garments
          delivered on time, every time, with complete transparency throughout the manufacturing
          process.
        </motion.p>
      </div>
    </div>
  );
}

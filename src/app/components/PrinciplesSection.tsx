import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const LOGO_YELLOW = '#fecc00';

const ICON_OPACITY = 0.06;
const ICON_SIZE = 44;
const GRID_COLS = 6;
const GRID_ROWS = 5;
const GRID_GAP = 72;

const APPAREL_ICONS_BASE = '/apparel%20icons';
const APPAREL_ICON_FILES = [
  'tshirt.png',
  'jacket.png',
  'hoodie.png',
  'sweatshirt.png',
  'polo-shirt.png',
  'jersey.png',
  'suit.png',
  'dress.png',
];

const PRINCIPAL_IMAGES_BASE = '/our principal images';

function ApparelIconGrid() {
  const total = GRID_COLS * GRID_ROWS;

  return (
    <div
      className="absolute inset-0 grid pointer-events-none z-0 overflow-hidden items-center justify-center p-10 md:p-14 lg:p-20"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, ${ICON_SIZE}px)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, ${ICON_SIZE}px)`,
        gap: GRID_GAP,
        justifyContent: 'center',
        alignContent: 'center',
      }}
      aria-hidden
    >
      {Array.from({ length: total }, (_, i) => {
        const file = APPAREL_ICON_FILES[i % APPAREL_ICON_FILES.length];
        const src = `${APPAREL_ICONS_BASE}/${encodeURIComponent(file)}`;
        const rotation = (i % 5) * 3 - 6;
        return (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              opacity: ICON_OPACITY,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <img
              src={src}
              alt=""
              width={ICON_SIZE}
              height={ICON_SIZE}
              className="object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        );
      })}
    </div>
  );
}

const principles = [
  {
    number: '01',
    title: 'Quality',
    description:
      'Quality and performance never happen by chance; they define every action we take. After all, excellence is the only thing that guarantees our long-term success.',
    imageSrc: `https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public/website%20images/our%20principles/best_tshirt_manufacturer_in_bangalore.png`,
    imageAlt: 'best_tshirt_manufacturer_in_bangalore',
  },
  {
    number: '02',
    title: 'Integrity',
    description:
      'We believe that strong moral principles must exist in any field of activity, and the quality of being honest and open with clients and potential clients defines us as a company.',
    imageSrc: `https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public/website%20images/our%20principles/jacketmanufacturer%20in%20india.png`,
    imageAlt: 'jacketmanufacturer in india',
  },
  {
    number: '03',
    title: 'The right price',
    description:
      'We pride ourselves on our ability to estimate and budget the services we provide, which we consider fair. You will not pay a little or a lot, cheap or expensive, but exactly what it is worth.',
    imageSrc: `https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public/website%20images/our%20principles/white_label_hoodie_manufacturer.png`,
    imageAlt: 'best_cap_manufacturer in india',
  },
  {
    number: '04',
    title: 'Innovation',
    description:
      "It's clear that innovation is part of our DNA. At TAG Unlimited Clothing, we believe that success belongs to the brave, which is why we are not afraid to implement visionary ideas from the future.",
    imageSrc: `https://vwpseddaghxktpjtriaj.supabase.co/storage/v1/object/public/website%20images/our%20principles/best_cap_manufacturer%20in%20india.png`,
    imageAlt: 'white_label_hoodie_manufacturer',
  },
];

export function PrinciplesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const index = Math.min(Math.floor(latest * 4), 3);

      if (index > prevIndexRef.current) {
        setScrollDirection('down');
      } else if (index < prevIndexRef.current) {
        setScrollDirection('up');
      }

      prevIndexRef.current = index;
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  const activePrinciple = principles[activeIndex];

  const getAnimationVariants = () => {
    if (scrollDirection === 'down') {
      return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
      };
    }
    return {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    };
  };

  const variants = getAnimationVariants();

  const numberStyle = {
    WebkitTextStroke: `3px ${LOGO_YELLOW}`,
    WebkitTextFillColor: 'transparent' as const,
    textShadow: `0 0 40px rgba(254, 204, 0, 0.5)`,
  };

  return (
    <div ref={containerRef} id="principles" className="h-[400vh] w-full bg-black" style={{ position: 'relative' }}>
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-8 lg:px-12">
        {/* Background apparel icons */}
        <ApparelIconGrid />
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-20 md:top-28 left-0 right-0 text-center z-10"
        >
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase"
            style={{
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
            }}
          >
            OUR PRINCIPLES
          </h2>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] lg:gap-10 xl:gap-12 w-full items-center justify-items-center">
          {/* Mobile layout */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-mobile-${activeIndex}`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h3 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {activePrinciple.title}
                </h3>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`card-mobile-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-w-2xl"
              >
                <img
                  src={activePrinciple.imageSrc}
                  alt={activePrinciple.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[8rem] md:text-[12rem] font-black leading-none"
                    style={numberStyle}
                  >
                    {activePrinciple.number}
                  </motion.div>
                </div>
                <div className="absolute -bottom-20 -right-10 text-[20rem] font-black text-gray-800/20 leading-none pointer-events-none">
                  {principles[(activeIndex + 1) % 4].number}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-mobile-${activeIndex}`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl"
              >
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {activePrinciple.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop layout */}
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${activeIndex}`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.6 }}
                className="text-left hidden lg:block"
              >
                <h3 className="text-4xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                  {activePrinciple.title}
                </h3>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
                className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl hidden lg:block w-full"
              >
                <img
                  src={activePrinciple.imageSrc}
                  alt={activePrinciple.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[12rem] lg:text-[16rem] font-black leading-none"
                    style={numberStyle}
                  >
                    {activePrinciple.number}
                  </motion.div>
                </div>
                <div className="absolute -bottom-20 -right-10 text-[20rem] font-black text-gray-800/20 leading-none pointer-events-none">
                  {principles[(activeIndex + 1) % 4].number}
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeIndex}`}
                initial={variants.initial}
                animate={variants.animate}
                exit={variants.exit}
                transition={{ duration: 0.6 }}
                className="text-right hidden lg:block"
              >
                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                  {activePrinciple.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </>
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-10 md:bottom-20 left-0 right-0 flex justify-center gap-3 z-10">
          {principles.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-12' : 'w-8'
              }`}
              style={{
                backgroundColor: index === activeIndex ? LOGO_YELLOW : '#4b5563',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

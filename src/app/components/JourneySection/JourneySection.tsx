import { motion } from 'motion/react';
import { TimelineContainer } from './TimelineContainer';

export function JourneySection() {
  return (
    <section
      className="bg-gradient-to-b from-gray-50 via-amber-50/30 to-white py-12 md:py-20"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.header
          className="mb-16 max-w-2xl md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2
            id="journey-heading"
            className="mb-4 text-[clamp(2rem,6vw,3.5rem)] font-bold uppercase tracking-tight text-black"
            style={{ fontFamily: 'var(--font-heading, Montserrat, sans-serif)' }}
          >
            Our Journey
          </h2>
          <p
            className="text-lg leading-relaxed text-gray-600 md:text-xl"
            style={{ fontFamily: 'var(--font-family, Inter, sans-serif)' }}
          >
            From a small garment manufacturing unit in Bangalore to a trusted apparel production
            partner for fashion brands worldwide.
          </p>
        </motion.header>

        {/* Timeline */}
        <TimelineContainer />
      </div>
    </section>
  );
}

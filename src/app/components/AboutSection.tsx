import React from 'react';
import { Link } from 'react-router';
import { useMediaAssets } from '../lib/useMediaAssets';
import { HERO_POSTER } from '../../hero-poster-config';
import { OptimizedImage } from './OptimizedImage';
import { StatsCards } from './StatsCards';
import './AboutSection.css';

const LOGO_YELLOW = '#fecc00';

/** Reuse optimized hero poster (WebP when available) */
const ABOUT_IMAGE = HERO_POSTER;
const ABOUT_IMAGE_ALT =
  'Best garment factory in Bangalore – TAG Unlimited, leading best apparel manufacturer in India for private label clothing, knitwear, T-shirts, hoodies and bulk garment production';

export const AboutSection = React.memo(function AboutSection() {
  const { getUrl } = useMediaAssets();

  return (
    <section className="bg-white py-16 md:py-24 lg:py-28" id="about">
      <div className="max-w-[1440px] xl:max-w-[1600px] 2xl:max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
        <h2 className="about-section-heading">
          About Us
        </h2>
        {/* Mobile only: flow – para1, image1, para2+3, image2, para4, button */}
        <div
          className="about-section-mobile-flow text-gray-600 mb-16"
          style={{
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--text-body)',
            lineHeight: 1.6,
          }}
        >
          <p className="about-section-flow-p">
            <span style={{ color: LOGO_YELLOW, fontWeight: 700 }}>TAG Unlimited</span> is a Bangalore-based private label clothing and knitwear manufacturer specializing in bulk production of T-Shirts, Hoodies, Shirts and custom apparel for fashion brands and businesses.
          </p>
          <div className="about-section-flow-image">
            <img
              src={ABOUT_IMAGE}
              alt={ABOUT_IMAGE_ALT}
              className="about-section-image w-full rounded-2xl overflow-hidden shadow-2xl"
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              sizes="100vw"
            />
          </div>
          <p className="about-section-flow-p">
            Our manufacturing facility is designed for structured production with consistent quality standards and reliable delivery timelines. From sampling to final dispatch, every order follows organized workflows that ensure efficiency and accuracy.
          </p>
          <p className="about-section-flow-p">
            Our operations are powered by integrated production management systems that allow us to track every order stage and maintain clear production timelines, ensuring dependable delivery and consistent manufacturing quality.
          </p>
          <div className="about-section-flow-image">
            <OptimizedImage
              src={getUrl('other images', 'fabric rolls.webp')}
              alt="Fabric rolls and materials at TAG Unlimited garment manufacturing facility"
              width={800}
              height={450}
              className="about-section-image w-full rounded-2xl overflow-hidden shadow-2xl"
              loading="lazy"
              referrerPolicy="no-referrer"
              sizes="100vw"
            />
          </div>
          <p className="about-section-flow-p">
            We work with fashion brands, startups, corporate buyers and export clients across India, supporting them with scalable apparel manufacturing solutions.
          </p>
          <Link
            to="/about-apparel-manufacturer-bangalore"
            className="inline-block text-gray-900 font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-300 mt-6"
            style={{ backgroundColor: LOGO_YELLOW, fontSize: '1rem' }}
          >
            Learn More About Us
          </Link>
        </div>

        {/* Desktop: grid – text left, images right */}
        <div className="about-section-content grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start mb-16 md:mb-20">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div
              className="text-gray-600 mb-6 space-y-4"
              style={{
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--text-body)',
                lineHeight: 1.6,
                maxWidth: '720px',
              }}
            >
              <p>
                <span style={{ color: LOGO_YELLOW, fontWeight: 700 }}>TAG Unlimited</span> is a Bangalore-based private label clothing and knitwear manufacturer specializing in bulk production of T-Shirts, Hoodies, Shirts and custom apparel for fashion brands and businesses.
              </p>
              <p>
                Our manufacturing facility is designed for structured production with consistent quality standards and reliable delivery timelines. From sampling to final dispatch, every order follows organized workflows that ensure efficiency and accuracy.
              </p>
              <p>
                Our operations are powered by integrated production management systems that allow us to track every order stage and maintain clear production timelines, ensuring dependable delivery and consistent manufacturing quality.
              </p>
              <p>
                We work with fashion brands, startups, corporate buyers and export clients across India, supporting them with scalable apparel manufacturing solutions.
              </p>
            </div>
            <Link
              to="/about-apparel-manufacturer-bangalore"
              className="inline-block text-gray-900 font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity duration-300"
              style={{ backgroundColor: LOGO_YELLOW, fontSize: '1rem' }}
            >
              Learn More About Our Manufacturing
            </Link>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 about-section-images">
            <div className="about-section-image-wrap relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={ABOUT_IMAGE}
                alt={ABOUT_IMAGE_ALT}
                className="about-section-image"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>
            <div className="about-section-image-wrap relative w-full rounded-2xl overflow-hidden shadow-2xl">
              <OptimizedImage
                src={getUrl('other images', 'fabric rolls.webp')}
                alt="Fabric rolls and materials at TAG Unlimited garment manufacturing facility"
                width={800}
                height={450}
                className="about-section-image"
                loading="lazy"
                referrerPolicy="no-referrer"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>
          </div>
        </div>

        {/* Statistics grid - yellow cards */}
        <StatsCards cardBgColor={LOGO_YELLOW} />
      </div>
    </section>
  );
});

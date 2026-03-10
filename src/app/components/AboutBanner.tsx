import { OptimizedImage } from './OptimizedImage';
import './AboutBanner.css';

/** Full-width background: served from public/ */
const BANNER_BACKGROUND = '/hero-poster.webp';

export function AboutBanner() {
  return (
    <section className="about-banner" aria-label="About us banner">
      <div className="about-banner-bg">
        <OptimizedImage
          src={BANNER_BACKGROUND}
          alt="Apparel manufacturing facility – TAG Unlimited Clothing Bangalore"
          width={1920}
          height={1080}
          quality={80}
          unoptimized
          sizes="100vw"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="about-banner-overlay" aria-hidden />
      <div className="about-banner-inner">
        <h1 className="about-banner-heading">
          <span className="about-banner-line1">We let our</span>
          <span className="about-banner-line2">threads do all</span>
          <span className="about-banner-line3">the talking!</span>
        </h1>
      </div>
    </section>
  );
}

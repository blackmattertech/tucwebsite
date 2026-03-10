import { OptimizedImage } from './OptimizedImage';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  dark?: boolean;
  /** Optional extra class for the section (e.g. min-h-[60vh] for taller hero). */
  sectionClassName?: string;
  /** Use "lazy" so the hero image loads only when this page is open and in view (no preload from other routes). */
  imageLoading?: 'eager' | 'lazy';
  /** Optional alt text for the hero image. */
  imageAlt?: string;
  /** Optional class for the h1 (e.g. infrastructure-style heading). */
  headingClassName?: string;
  /** Optional class for the subtitle paragraph. */
  subtitleClassName?: string;
}

const DEFAULT_IMAGE_ALT = 'Page hero background – apparel manufacturing and custom clothing';

export function PageHero({ title, subtitle, backgroundImage, dark = true, sectionClassName, imageLoading = 'eager', imageAlt, headingClassName, subtitleClassName }: PageHeroProps) {
  const defaultHeadingClass = backgroundImage && dark ? 'text-white' : 'text-gray-900';
  const defaultSubtitleClass = backgroundImage && dark ? 'text-white/90' : 'text-gray-600';
  return (
    <section className={`relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden ${sectionClassName ?? ''}`.trim()}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0">
            <OptimizedImage
              src={backgroundImage}
              alt={imageAlt ?? DEFAULT_IMAGE_ALT}
              width={1920}
              height={1080}
              quality={80}
              sizes="100vw"
              loading={imageLoading}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute inset-0 ${dark ? 'bg-black/60' : 'bg-white/80'}`} />
        </>
      )}
      
      <div className={`relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 ${backgroundImage ? 'text-center' : ''}`}>
        <h1
          className={headingClassName ?? `mb-4 ${defaultHeadingClass}`}
          style={!headingClassName ? { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1 } : undefined}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={subtitleClassName ?? `max-w-3xl ${backgroundImage ? 'mx-auto' : ''} ${defaultSubtitleClass}`}
            style={!subtitleClassName ? { fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', lineHeight: 1.6 } : undefined}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

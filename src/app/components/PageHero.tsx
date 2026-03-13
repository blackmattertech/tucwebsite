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
  /** When false, no dark/light overlay on the background image. Default true. */
  showOverlay?: boolean;
  /** When false, title and subtitle are not rendered. Default true. */
  showText?: boolean;
  /** 1–100. Higher = better quality, larger file. Default 80. */
  imageQuality?: number;
  /** When true, the background image starts below the fixed header instead of behind it. */
  imageStartsBelowHeader?: boolean;
}

const DEFAULT_IMAGE_ALT = 'Page hero background – apparel manufacturing and custom clothing';

export function PageHero({ title, subtitle, backgroundImage, dark = true, sectionClassName, imageLoading = 'eager', imageAlt, headingClassName, subtitleClassName, showOverlay = true, showText = true, imageQuality = 80, imageStartsBelowHeader = false }: PageHeroProps) {
  const defaultHeadingClass = backgroundImage && dark ? 'text-white' : 'text-gray-900';
  const defaultSubtitleClass = backgroundImage && dark ? 'text-white/90' : 'text-gray-600';
  const headerOffset = imageStartsBelowHeader ? 'pt-16 md:pt-20 pb-20 lg:pb-24' : 'pt-32 pb-20 lg:pt-40 lg:pb-24';
  const imageWrapperClass = imageStartsBelowHeader ? 'absolute top-16 md:top-20 left-0 right-0 bottom-0' : 'absolute inset-0';
  const overlayClass = imageStartsBelowHeader ? imageWrapperClass : 'absolute inset-0';
  return (
    <section className={`relative ${headerOffset} overflow-hidden ${sectionClassName ?? ''}`.trim()}>
      {backgroundImage && (
        <>
          <div className={imageWrapperClass}>
            <OptimizedImage
              src={backgroundImage}
              alt={imageAlt ?? DEFAULT_IMAGE_ALT}
              width={1920}
              height={1080}
              quality={imageQuality}
              sizes="100vw"
              loading={imageLoading}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          {showOverlay && <div className={`${overlayClass} ${dark ? 'bg-black/60' : 'bg-white/80'}`} />}
        </>
      )}

      {showText && (
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
      )}
    </section>
  );
}

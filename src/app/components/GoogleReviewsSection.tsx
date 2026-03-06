import { useRef, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  reviewerName: string;
  reviewerCompany: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
}

const GOOGLE_REVIEWS_LINK =
  'https://www.google.com/search?q=TAG+UNLIMITED+Reviews&sa=X&ved=2ahUKEwj97ZGAn_2SAxXOSGwGHQVwHdAQ0bkNegQIKRAH';

const reviews: Review[] = [
  {
    id: 1,
    reviewerName: 'AJsVIEW',
    reviewerCompany: 'Local Guide • 46 reviews',
    rating: 5,
    reviewTitle: 'Love at first sight ❤️',
    reviewText:
      "We've been purchasing Tees for our Club from Rahul (Tag Unlimited) for the past 3 years, and we've always been satisfied with the product quality and service. Rahul and team are swift and professional."
  },
  {
    id: 2,
    reviewerName: 'Priya Sharma',
    reviewerCompany: 'Local Guide • 32 reviews',
    rating: 5,
    reviewTitle: 'Outstanding quality and service',
    reviewText:
      "Outstanding quality and professional service. TAG UNLIMITED delivered our bulk order of 5,000 custom hoodies exactly on time with perfect finishing. Highly recommend for any serious apparel manufacturing needs."
  },
  {
    id: 3,
    reviewerName: 'Rajesh Kumar',
    reviewerCompany: 'Local Guide • 28 reviews',
    rating: 5,
    reviewTitle: 'Best in Bangalore',
    reviewText:
      "Best apparel manufacturer in Bangalore! Their attention to detail and quality control is exceptional. We've worked with many manufacturers, but TAG UNLIMITED stands out for their reliability and professionalism."
  },
  {
    id: 4,
    reviewerName: 'Sarah Johnson',
    reviewerCompany: 'Local Guide • 54 reviews',
    rating: 5,
    reviewTitle: 'Exceeded expectations',
    reviewText:
      "Excellent private label manufacturing partner. From initial samples to final delivery, everything was handled professionally. The quality of fabrics and stitching exceeded our expectations."
  },
  {
    id: 5,
    reviewerName: 'Michael Chen',
    reviewerCompany: 'Local Guide • 19 reviews',
    rating: 5,
    reviewTitle: 'Go-to manufacturer',
    reviewText:
      "TAG UNLIMITED has been our go-to manufacturer for custom apparel. Their production capacity, quality standards, and timely delivery make them ideal for large-scale orders. Highly professional team!"
  },
  {
    id: 6,
    reviewerName: 'Anita Desai',
    reviewerCompany: 'Local Guide • 41 reviews',
    rating: 5,
    reviewTitle: 'Impressive infrastructure',
    reviewText:
      "Impressed with their infrastructure and manufacturing capabilities. They handled our complex requirements with ease and delivered premium quality garments. Great communication throughout the process."
  }
];

function GoogleLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="bg-white rounded-2xl p-6 h-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-gray-100/80 min-h-[280px] flex flex-col flex-shrink-0"
      style={{ fontFamily: 'var(--font-family)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <GoogleLogoIcon className="w-5 h-5 flex-shrink-0" />
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-[#ea4335] text-[#ea4335] flex-shrink-0"
            />
          ))}
        </div>
        <span className="text-gray-700 font-medium ml-0.5" style={{ fontSize: '0.8125rem' }}>5.0</span>
      </div>
      <h4 className="text-gray-900 font-semibold mb-2 leading-tight" style={{ fontSize: '1rem' }}>
        {review.reviewTitle}
      </h4>
      <p className="text-gray-600 leading-relaxed flex-1 line-clamp-4" style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
        {review.reviewText}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-gray-900 font-semibold" style={{ fontSize: '0.875rem' }}>{review.reviewerName}</p>
        <p className="text-gray-500" style={{ fontSize: '0.75rem' }}>{review.reviewerCompany}</p>
      </div>
    </div>
  );
}

function CTAPanel() {
  return (
    <div
      className="bg-[#0f0f0f] rounded-2xl p-6 md:p-8 h-full min-h-[280px] flex flex-col items-center justify-center text-center relative overflow-hidden flex-shrink-0"
      style={{ fontFamily: 'var(--font-family)' }}
    >
      <div
        className="absolute bottom-0 right-0 w-3/4 h-3/4 rounded-full opacity-30"
        style={{
          background:
            'radial-gradient(circle at 100% 100%, #c53030 0%, transparent 60%)'
        }}
      />
      <div className="relative z-10">
        <GoogleLogoIcon className="w-10 h-10 mx-auto mb-3" />
        <div className="flex justify-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className="fill-[#fbbf24] text-[#fbbf24] flex-shrink-0"
            />
          ))}
        </div>
        <a
          href={GOOGLE_REVIEWS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-gray-900 font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
          style={{ fontSize: '0.875rem' }}
        >
          for yourself
        </a>
        <div className="flex items-center justify-center gap-1.5 mt-4 text-white/90" style={{ fontSize: '0.875rem' }}>
          <GoogleLogoIcon className="w-4 h-4" />
          <span>180+ reviews</span>
        </div>
      </div>
    </div>
  );
}

const slides = [<CTAPanel key="cta" />, ...reviews.map((r) => <ReviewCard key={r.id} review={r} />)];

export function GoogleReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
    breakpoints: {
      '(max-width: 768px)': { containScroll: 'trimSnaps' },
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  // Autoplay: 4.5s on desktop, 4s on mobile
  useEffect(() => {
    if (!emblaApi) return;
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, typeof window !== 'undefined' && window.innerWidth < 768 ? 4000 : 4500);
    };
    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };
    startAutoplay();
    const container = emblaRef.current;
    if (!container) return;
    container.addEventListener('mouseenter', stopAutoplay);
    container.addEventListener('mouseleave', startAutoplay);
    return () => {
      stopAutoplay();
      container?.removeEventListener('mouseenter', stopAutoplay);
      container?.removeEventListener('mouseleave', startAutoplay);
    };
  }, [emblaApi, emblaRef]);

  return (
    <section id="reviews" className="bg-white py-16 md:py-24" style={{ fontFamily: 'var(--font-family)' }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-5">
            <h2
              className="text-gray-900 mb-12 md:mb-16"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Our Customers Praise Us
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <div className="relative inline-block">
                <span
                  className="text-gray-900 font-bold"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  180+
                </span>
                <span className="text-gray-600 ml-1.5" style={{ fontSize: '0.9375rem' }}>
                  verified reviews
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #ea4335 0%, transparent 100%)' }}
                />
              </div>
              <div>
                <span
                  className="text-gray-900 font-bold"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                    fontFamily: 'var(--font-heading)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  5.0
                </span>
                <span className="text-gray-600 ml-1.5" style={{ fontSize: '0.9375rem' }}>
                  average number of stars
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p
              className="text-gray-600 leading-relaxed max-w-xl"
              style={{ fontSize: '1rem', lineHeight: 1.6 }}
            >
              The results so far confirm our vision. Our customers appreciate the
              courage to explore territories that others dare not even dream of,
              as evidenced by the over 180 impeccable, 5-star reviews.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6 -mx-2 md:-mx-3">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 px-2 md:px-3 md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{
                backgroundColor: i === selectedIndex ? '#ea4335' : '#cbd5e1',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href={GOOGLE_REVIEWS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 font-medium transition-colors"
            style={{ fontSize: '0.875rem' }}
          >
            View all reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

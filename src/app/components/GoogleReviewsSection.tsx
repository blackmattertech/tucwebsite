import { useRef, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Star } from 'lucide-react';
import './GoogleReviewsSection.css';

interface Review {
  id: number;
  reviewerName: string;
  reviewerCompany: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
}

const GOOGLE_REVIEWS_LINK =
  'https://www.google.com/search?sca_esv=d68f2633f4bc5039&sxsrf=ANbL-n4Ns-QCRSdlx7qqnBF2EjPkOkhl5A:1772981154050&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQcgV4fW5XOKh3v0nLjFxkCB8UMoLxMK-EACCiu2PfBx_LE8_U035IoRbWhbsDPjQ6wC0XkKrz6ihETQBpjModofqFo6&q=TAG+UNLIMITED+Reviews&sa=X&ved=2ahUKEwiet4W_xZCTAxWgTmwGHc3CHOsQ0bkNegQIQhAH&biw=2048&bih=1158&dpr=2';

const reviews: Review[] = [
  {
    id: 1,
    reviewerName: 'Disha B S',
    reviewerCompany: '3 reviews · 2 photos',
    rating: 5,
    reviewTitle: 'Highly recommend!',
    reviewText:
      "I've been using Tag Unlimited products since 2023, and the experience has been excellent. The quality of their products is top notch, delivery is always quick, and they offer a wide range of merchandise from jackets to caps and everything in between. Truly a one-stop shop for all things merchandise. Highly recommend!"
  },
  {
    id: 2,
    reviewerName: 'Pavan Medheramitla',
    reviewerCompany: 'Local Guide · 93 reviews · 684 photos',
    rating: 5,
    reviewTitle: 'Wide range and great quality',
    reviewText:
      "Wide range of varieties and cloth quality is really good and comparatively price is very reasonable. They are very professional and always helpful."
  },
  {
    id: 3,
    reviewerName: 'Harshith B.',
    reviewerCompany: 'Local Guide · 19 reviews · 19 photos',
    rating: 5,
    reviewTitle: 'Picture perfect embroidery',
    reviewText:
      "Best place to get ur tees customised. I ordered 22 tees for my college fest which needed to be embroidered with a complex design - it came out picture perfect. Timely delivery and good customer support."
  },
  {
    id: 4,
    reviewerName: 'Piyush Goyal',
    reviewerCompany: 'Local Guide · 28 reviews',
    rating: 5,
    reviewTitle: 'Couldn\'t be happier',
    reviewText:
      "I recently ordered a batch of custom t-shirts from this manufacturer and I couldn't be happier with the result! The team was incredibly helpful throughout the entire process, from helping me choose the right shirt style and color to making sure my design was just right. The quality of the t-shirts is top-notch and the printing is sharp and vibrant. The turnaround time was impressively quick - I received my order well ahead of schedule. I highly recommend this custom t-shirt manufacturer. Thanks for the excellent service!"
  },
  {
    id: 5,
    reviewerName: 'Madhu M',
    reviewerCompany: '3 reviews',
    rating: 5,
    reviewTitle: 'Everything at one place',
    reviewText:
      "One of the best place where people can buy customised T-shirt, Hoodies, Varsitys, Sports wearing and also best engraving. Everything at one place with an affordable price."
  },
  {
    id: 6,
    reviewerName: 'Sharvesh mohan raj',
    reviewerCompany: '1 review',
    rating: 5,
    reviewTitle: 'Very nice t-shirt, good staff',
    reviewText: 'Wow very nice t-shirt good staffs.'
  },
  {
    id: 7,
    reviewerName: 'Naved Ahmed',
    reviewerCompany: 'Local Guide · 28 reviews · 1 photo',
    rating: 5,
    reviewTitle: 'Sub-24 hours and hassle free',
    reviewText:
      "Got a print done on urgent basis. Quick (sub-24 hours). Good quality and affordable. The staff was communicative and hassle free. Definitely recommend over other places."
  },
  {
    id: 8,
    reviewerName: '1MS19CH020 LAILA',
    reviewerCompany: '1 review',
    rating: 5,
    reviewTitle: 'Pretty satisfied!',
    reviewText:
      "Great quality for the price - varsity jacket and hoodies. They accurately reproduced my submitted design and the customer service from Kavitha and the owner Rahul was excellent. The order came in pretty soon, exactly when I wanted it. Pretty satisfied!"
  },
  {
    id: 9,
    reviewerName: 'Maheshwari N',
    reviewerCompany: '1 review',
    rating: 5,
    reviewTitle: 'One stop for all custom products',
    reviewText:
      "One stop place for all custom products. We ordered 200 t-shirts for our Fest (Bishop Cottons) with super fast delivery - literally in 2 working days - and the best price. Excellent work in such short notice, always catering to customers' needs."
  },
  {
    id: 10,
    reviewerName: 'Abhishek Rao',
    reviewerCompany: 'Local Guide · 45 reviews · 249 photos',
    rating: 5,
    reviewTitle: 'Customization is next level',
    reviewText:
      "#TagMyTee & #RahulTheTeeShirtGuy have done wonders. With #TagUnlimited since the beginning. Customization is next level - Quality, Time, Designs are the best. The team in Bengaluru is the most reliable for bringing our ideas into reality. Service provided all over India. Just go ahead without a second thought - it's just #Unlimited. Thanks Team for being so wonderful!"
  },
  {
    id: 11,
    reviewerName: 'Rahul Gohrani',
    reviewerCompany: 'Local Guide · 8 reviews · 694 photos',
    rating: 5,
    reviewTitle: 'Top notch quality, delivered on time',
    reviewText:
      "Top notch quality, delivered on time, open to feedback and modifications - these are the few qualities you can expect when dealing with Rahul. I have had two purchases from TAG unlimited and Rahul has been very patient and professional. Will definitely recommend him to my peers."
  },
  {
    id: 12,
    reviewerName: 'Riza Deka',
    reviewerCompany: '1 review',
    rating: 5,
    reviewTitle: 'Fastest delivery as per commitment',
    reviewText:
      "The fastest delivery that I ever got as per their commitment. Very satisfying fabric and the design was awesome. In future I would recommend to all my known people. Keep up your good work and all the best for the future."
  },
  {
    id: 13,
    reviewerName: 'Shivangini B',
    reviewerCompany: '11 reviews',
    rating: 5,
    reviewTitle: 'Product quality and fabric awesome',
    reviewText:
      "I had ordered t-shirts with Rahul for the first time. Their product quality was very good and their fabric is just awesome. The print on the t-shirt is just amazing. I would highly recommend going here to get your tees customized - they are customer friendly and get it delivered on time. Kudos to the team and their work."
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
          <span>294+ reviews</span>
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
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-5">
            <h2 className="reviews-section-heading">
              Our Customers
              <br />
              Praise Us
            </h2>
            <div className="reviews-section-stats">
              <div className="relative inline-block">
                <span className="reviews-section-metric-num">294+</span>
                <span className="reviews-section-metric-label">verified reviews</span>
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #ea4335 0%, transparent 100%)' }}
                />
              </div>
              <div>
                <span className="reviews-section-metric-num">4.9</span>
                <span className="reviews-section-metric-label">average number of stars</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 flex items-center reviews-section-paragraph-wrap">
            <p className="reviews-section-paragraph">
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
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 font-semibold text-gray-900 transition-colors hover:bg-[#e6b800]"
            style={{ backgroundColor: '#fecc00', fontSize: '0.875rem' }}
          >
            View all reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

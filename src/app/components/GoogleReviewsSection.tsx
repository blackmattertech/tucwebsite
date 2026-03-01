import { useRef } from 'react';
import Slider from 'react-slick';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  id: number;
  reviewerName: string;
  reviewerAvatar: string;
  reviewerInfo: string;
  rating: number;
  date: string;
  reviewText: string;
}

const reviews: Review[] = [
  {
    id: 1,
    reviewerName: 'AJsVIEW',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    reviewerInfo: 'Local Guide • 46 reviews • 6 photos',
    rating: 5,
    date: 'a year ago',
    reviewText: "We've been purchasing Tees for our Club from Rahul (Tag Unlimited) for the past 3 years, and we've always been satisfied with the product quality and service. Rahul and team are swift and professional."
  },
  {
    id: 2,
    reviewerName: 'Priya Sharma',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    reviewerInfo: 'Local Guide • 32 reviews • 12 photos',
    rating: 5,
    date: '6 months ago',
    reviewText: "Outstanding quality and professional service. TAG UNLIMITED delivered our bulk order of 5,000 custom hoodies exactly on time with perfect finishing. Highly recommend for any serious apparel manufacturing needs."
  },
  {
    id: 3,
    reviewerName: 'Rajesh Kumar',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    reviewerInfo: 'Local Guide • 28 reviews • 8 photos',
    rating: 5,
    date: '3 months ago',
    reviewText: "Best apparel manufacturer in Bangalore! Their attention to detail and quality control is exceptional. We've worked with many manufacturers, but TAG UNLIMITED stands out for their reliability and professionalism."
  },
  {
    id: 4,
    reviewerName: 'Sarah Johnson',
    reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    reviewerInfo: 'Local Guide • 54 reviews • 20 photos',
    rating: 5,
    date: '2 months ago',
    reviewText: "Excellent private label manufacturing partner. From initial samples to final delivery, everything was handled professionally. The quality of fabrics and stitching exceeded our expectations."
  },
  {
    id: 5,
    reviewerName: 'Michael Chen',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    reviewerInfo: 'Local Guide • 19 reviews • 5 photos',
    rating: 5,
    date: '1 month ago',
    reviewText: "TAG UNLIMITED has been our go-to manufacturer for custom apparel. Their production capacity, quality standards, and timely delivery make them ideal for large-scale orders. Highly professional team!"
  },
  {
    id: 6,
    reviewerName: 'Anita Desai',
    reviewerAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
    reviewerInfo: 'Local Guide • 41 reviews • 15 photos',
    rating: 5,
    date: '2 weeks ago',
    reviewText: "Impressed with their infrastructure and manufacturing capabilities. They handled our complex requirements with ease and delivered premium quality garments. Great communication throughout the process."
  }
];

export function GoogleReviewsSection() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-[#FFC107] text-[#FFC107]' : 'text-gray-600'}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-[#111111] py-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Business Info Card */}
        <div className="bg-[#1f1f1f] rounded-xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-white text-3xl lg:text-4xl mb-3" style={{ fontWeight: 700 }}>
                TAG UNLIMITED
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                2nd Floor, Jalageramma, No 13, Mariamma Temple Rd, Lottegollahalli, Devinagar, Bengaluru, Karnataka 560094, India
              </p>
            </div>
            <a 
              href="https://www.google.com/search?sca_esv=477fbb8c9f03b619&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQcgV4fW5XOKh3v0nLjFxkCB8UMoLxMK-EACCiu2PfBx_LE8_U035IoRbWhbsDPjQ6wC0XkKrz6ihETQBpjModofqFo6&q=TAG+UNLIMITED+Reviews&sa=X&ved=2ahUKEwj97ZGAn_2SAxXOSGwGHQVwHdAQ0bkNegQIKRAH&biw=2048&bih=1158&dpr=2"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-600 text-white px-6 py-3 rounded-full hover:border-gray-400 transition-colors whitespace-nowrap" 
              style={{ fontWeight: 600, fontSize: '15px' }}
            >
              Write a Review
            </a>
          </div>

          {/* Rating Display */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="text-white text-6xl" style={{ fontWeight: 700 }}>
                4.8
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} className="fill-[#FFC107] text-[#FFC107]" />
                  ))}
                </div>
                <p className="text-gray-400 text-sm">234 Google Reviews</p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <div className="inline-flex items-center gap-2 bg-[#111111] px-4 py-2 rounded-full">
                <Star size={16} className="fill-[#FFC107] text-[#FFC107]" />
                <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                  4.8 Google Rating
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Slideshow Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-white text-2xl" style={{ fontWeight: 600 }}>
            Customer Reviews
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="p-2 rounded-full bg-[#1f1f1f] text-white hover:bg-[#2a2a2a] transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="p-2 rounded-full bg-[#1f1f1f] text-white hover:bg-[#2a2a2a] transition-colors"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Reviews Slideshow */}
        <div className="reviews-slider mb-8">
          <Slider ref={sliderRef} {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="px-3">
                <div className="bg-[#1f1f1f] rounded-xl p-6 h-full">
                  {/* Reviewer Info */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={review.reviewerAvatar}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white mb-1" style={{ fontWeight: 600 }}>
                        {review.reviewerName}
                      </h4>
                      <p className="text-gray-500 text-xs mb-2">
                        {review.reviewerInfo}
                      </p>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-gray-500 text-xs">{review.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Reviews Link */}
        <div className="flex items-center justify-center gap-6 pt-8 border-t border-gray-800">
          <a
            href="https://www.google.com/search?sca_esv=477fbb8c9f03b619&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQcgV4fW5XOKh3v0nLjFxkCB8UMoLxMK-EACCiu2PfBx_LE8_U035IoRbWhbsDPjQ6wC0XkKrz6ihETQBpjModofqFo6&q=TAG+UNLIMITED+Reviews&sa=X&ved=2ahUKEwj97ZGAn_2SAxXOSGwGHQVwHdAQ0bkNegQIKRAH&biw=2048&bih=1158&dpr=2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
            style={{ fontWeight: 500 }}
          >
            View All Reviews →
          </a>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Star size={16} className="fill-[#FFC107] text-[#FFC107]" />
            <span>4.8 Rating on Google</span>
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style>{`
        .reviews-slider .slick-dots {
          bottom: -40px;
        }
        .reviews-slider .slick-dots li button:before {
          color: #666;
          font-size: 8px;
        }
        .reviews-slider .slick-dots li.slick-active button:before {
          color: #FFC107;
        }
        .reviews-slider .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
}
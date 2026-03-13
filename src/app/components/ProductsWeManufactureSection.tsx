import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { OptimizedImage } from './OptimizedImage';
import './AboutSection.css';

const LOGO_YELLOW = '#fecc00';
const SECTION_HEADING = 'Private Label Apparel Categories';

const PRODUCT_1 = {
  heading: 'Sports Performance T-Shirts',
  description:
    'High-quality sports t-shirts manufactured for performance, durability, and comfort, ideal for fitness brands, sports teams, and activewear labels. We specialize in bulk sportswear manufacturing with breathable fabrics, moisture-wicking technology, and custom branding options.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/sports%20tshirt%20manufacturer%20in%20bangalore.png',
  imageAlt: 'Sports t-shirt manufacturing in Bangalore - performance and activewear',
};

const PRODUCT_2 = {
  heading: 'Classic Cotton Round Neck T-Shirts',
  description:
    'Soft and breathable cotton round neck t-shirts manufactured for fashion brands and apparel businesses. Ideal for custom branding, screen printing, and bulk garment manufacturing programs.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/round%20neck%20tshirt%20in%20bangalore.png',
  imageAlt: 'Round neck t-shirt manufacturing in Bangalore - cotton, custom branding and bulk',
};

const PRODUCT_3 = {
  heading: 'Classic Polo T-Shirts',
  description:
    'Comfortable and stylish polo t-shirts manufactured for fashion brands and corporate buyers, with support for bulk production, embroidery branding, and private label apparel manufacturing.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/polo%20tshirt%20manufacturer%20in%20india.png',
  imageAlt: 'Polo t-shirt manufacturing in India - corporate and fashion brands, embroidery, private label',
};

const PRODUCT_4 = {
  heading: 'Custom Hoodie Manufacturing',
  description:
    'High-quality hoodies manufactured for fashion brands and apparel businesses, supporting bulk production with embroidery, printing, and private label branding.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/hoodies-manufacturers%20-in-bangalore.png',
  imageAlt: 'Hoodie manufacturing in Bangalore - bulk production, embroidery, printing, private label',
};

const PRODUCT_5 = {
  heading: 'Jacket Manufacturing',
  description:
    'Durable jackets manufactured for fashion brands and outerwear collections, supporting bulk garment production with custom designs and private label branding.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/jackets%20manufacturer%20in%20india.png',
  imageAlt: 'Jacket manufacturing in India - outerwear, bulk production, custom designs, private label',
};

const PRODUCT_6 = {
  heading: 'Oversized T-Shirt Manufacturing',
  description:
    'Trendy oversized t-shirts manufactured for streetwear brands and fashion labels, designed for comfort and modern style with scalable bulk garment production.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/oversize%20tshirt%20in%20bangalore-oversize-tshirt-manufacturer.png',
  imageAlt: 'Oversized t-shirt manufacturing in Bangalore - streetwear, bulk production',
};

const PRODUCT_7 = {
  heading: 'Sports Jersey Manufacturing',
  description:
    'High-performance sports jerseys manufactured for teams, sports brands, and athletic apparel companies, designed with breathable fabrics and durable stitching for professional use. Our facility supports bulk sports jersey manufacturing with sublimation printing, custom team branding, and private label sportswear production.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/sports%20jersey%20maker%20in%20bangalore.png',
  imageAlt: 'Sports jersey manufacturing in Bangalore - teams, sublimation, custom branding',
};

const PRODUCT_8 = {
  heading: 'Custom Cap Manufacturing',
  description:
    'Stylish caps manufactured for fashion brands, promotional merchandise companies, and corporate programs, with embroidery branding and scalable bulk production.',
  imageSrc:
    'https://ik.imagekit.io/tagunlimited/productspage/cap-manufacturer-in-india.png',
  imageAlt: 'Cap manufacturing in India - embroidery, promotional, corporate, bulk',
};

export function ProductsWeManufactureSection() {
  const image1Ref = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const image3Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const image4Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const image5Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);
  const image6Ref = useRef<HTMLDivElement>(null);
  const text6Ref = useRef<HTMLDivElement>(null);
  const image7Ref = useRef<HTMLDivElement>(null);
  const text7Ref = useRef<HTMLDivElement>(null);
  const image8Ref = useRef<HTMLDivElement>(null);
  const text8Ref = useRef<HTMLDivElement>(null);
  const image1InView = useInView(image1Ref, { once: true, amount: 0.2 });
  const text1InView = useInView(text1Ref, { once: true, amount: 0.2 });
  const image2InView = useInView(image2Ref, { once: true, amount: 0.2 });
  const text2InView = useInView(text2Ref, { once: true, amount: 0.2 });
  const image3InView = useInView(image3Ref, { once: true, amount: 0.2 });
  const text3InView = useInView(text3Ref, { once: true, amount: 0.2 });
  const image4InView = useInView(image4Ref, { once: true, amount: 0.2 });
  const text4InView = useInView(text4Ref, { once: true, amount: 0.2 });
  const image5InView = useInView(image5Ref, { once: true, amount: 0.2 });
  const text5InView = useInView(text5Ref, { once: true, amount: 0.2 });
  const image6InView = useInView(image6Ref, { once: true, amount: 0.2 });
  const text6InView = useInView(text6Ref, { once: true, amount: 0.2 });
  const image7InView = useInView(image7Ref, { once: true, amount: 0.2 });
  const text7InView = useInView(text7Ref, { once: true, amount: 0.2 });
  const image8InView = useInView(image8Ref, { once: true, amount: 0.2 });
  const text8InView = useInView(text8Ref, { once: true, amount: 0.2 });

  return (
    <section className="w-full bg-white" aria-labelledby="products-we-manufacture-heading">
      <div className="w-full max-w-none">
        {/* Main section heading - full width, matches About Us (thick, bold) */}
        <div className="w-full px-4 sm:px-6 lg:px-12 pt-16 pb-8 lg:pt-20 lg:pb-10">
          <h2
            id="products-we-manufacture-heading"
            className="about-section-heading max-w-[1440px] mx-auto line-clamp-2"
            style={{ whiteSpace: 'normal', textAlign: 'center' }}
          >
            {SECTION_HEADING}
          </h2>
        </div>

        {/* Block 1: image (left) + text (right), full viewport height for image */}
        <div className="w-full flex flex-col lg:flex-row min-h-0">
          <div
            ref={image1Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image1InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_1.imageSrc}
                alt={PRODUCT_1.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text1Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-4 lg:pr-10 xl:pl-6 xl:pr-12"
          >
            <motion.div
              className="max-w-lg mx-auto lg:mx-0"
              initial="hidden"
              animate={text1InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_1.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_1.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 2: text (left) + image (right), full viewport height for image */}
        <div className="w-full flex flex-col lg:flex-row-reverse min-h-0">
          {/* Right on desktop (first in row-reverse): image */}
          <div
            ref={image2Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden order-1"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image2InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_2.imageSrc}
                alt={PRODUCT_2.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          {/* Left on desktop (second in row-reverse): heading + description - align right so text sits next to image like polo block */}
          <div
            ref={text2Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-10 lg:pr-4 xl:pl-12 xl:pr-6 order-2"
          >
            <motion.div
              className="max-w-lg mx-auto lg:ml-auto lg:mr-0"
              initial="hidden"
              animate={text2InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_2.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_2.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 3: image (left) + text (right), same as block 1 */}
        <div className="w-full flex flex-col lg:flex-row min-h-0">
          <div
            ref={image3Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image3InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_3.imageSrc}
                alt={PRODUCT_3.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text3Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-4 lg:pr-10 xl:pl-6 xl:pr-12"
          >
            <motion.div
              className="max-w-lg mx-auto lg:mx-0"
              initial="hidden"
              animate={text3InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_3.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_3.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 4: text (left) + image (right) - Custom Hoodie */}
        <div className="w-full flex flex-col lg:flex-row-reverse min-h-0">
          <div
            ref={image4Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden order-1"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image4InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_4.imageSrc}
                alt={PRODUCT_4.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text4Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-10 lg:pr-4 xl:pl-12 xl:pr-6 order-2"
          >
            <motion.div
              className="max-w-lg mx-auto lg:ml-auto lg:mr-0"
              initial="hidden"
              animate={text4InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_4.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_4.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 5: image (left) + text (right) - Jacket */}
        <div className="w-full flex flex-col lg:flex-row min-h-0">
          <div
            ref={image5Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image5InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_5.imageSrc}
                alt={PRODUCT_5.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text5Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-4 lg:pr-10 xl:pl-6 xl:pr-12"
          >
            <motion.div
              className="max-w-lg mx-auto lg:mx-0"
              initial="hidden"
              animate={text5InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_5.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_5.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 6: text (left) + image (right) - Oversized T-Shirt */}
        <div className="w-full flex flex-col lg:flex-row-reverse min-h-0">
          <div
            ref={image6Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden order-1"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image6InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_6.imageSrc}
                alt={PRODUCT_6.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text6Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-10 lg:pr-4 xl:pl-12 xl:pr-6 order-2"
          >
            <motion.div
              className="max-w-lg mx-auto lg:ml-auto lg:mr-0"
              initial="hidden"
              animate={text6InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_6.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_6.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 7: image (left) + text (right) - Sports Jersey */}
        <div className="w-full flex flex-col lg:flex-row min-h-0">
          <div
            ref={image7Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image7InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_7.imageSrc}
                alt={PRODUCT_7.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text7Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-4 lg:pr-10 xl:pl-6 xl:pr-12"
          >
            <motion.div
              className="max-w-lg mx-auto lg:mx-0"
              initial="hidden"
              animate={text7InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_7.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_7.description}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Block 8: text (left) + image (right) - Custom Cap */}
        <div className="w-full flex flex-col lg:flex-row-reverse min-h-0">
          <div
            ref={image8Ref}
            className="w-full lg:w-[45%] min-h-[50vh] lg:h-screen shrink-0 overflow-hidden order-1"
          >
            <motion.div
              className="w-full h-full min-h-[50vh] lg:h-full"
              initial="hidden"
              animate={image8InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, scale: 0.98 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <OptimizedImage
                src={PRODUCT_8.imageSrc}
                alt={PRODUCT_8.imageAlt}
                width={1200}
                height={1600}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[50vh] lg:min-h-screen object-cover object-center"
              />
            </motion.div>
          </div>
          <div
            ref={text8Ref}
            className="w-full lg:w-[55%] flex items-center py-12 lg:py-20 px-4 sm:px-6 lg:pl-10 lg:pr-4 xl:pl-12 xl:pr-6 order-2"
          >
            <motion.div
              className="max-w-lg mx-auto lg:ml-auto lg:mr-0"
              initial="hidden"
              animate={text8InView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <h3
                className="mb-6 line-clamp-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.25, color: LOGO_YELLOW }}
              >
                {PRODUCT_8.heading}
              </h3>
              <p
                className="text-gray-600"
                style={{ fontSize: '1.0625rem', lineHeight: 1.8 }}
              >
                {PRODUCT_8.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

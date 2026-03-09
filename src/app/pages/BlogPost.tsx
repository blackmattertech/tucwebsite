import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export function BlogPost() {
  const relatedPosts = [
    {
      title: 'How to Choose a Clothing Manufacturer in India',
      image: 'https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      link: '/blog/clothing-manufacturer-india-guide'
    },
    {
      title: 'Best Fabric for T-Shirts Guide',
      image: 'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
      link: '/blog/best-fabric-for-tshirts'
    }
  ];

  return (
    <>
      <div className="pt-32 pb-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Link to="/blog-apparel-manufacturing-guides" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8" style={{ fontSize: '15px', fontWeight: 500 }}>
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-gray-900 text-white" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>
                MANUFACTURING
              </span>
            </div>

            <h1 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
              Private Label Manufacturing Process Explained
            </h1>

            <div className="flex items-center gap-6 text-gray-600 mb-8" style={{ fontSize: '15px' }}>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Manufacturing Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>February 15, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Featured Image */}
            <div className="aspect-[16/9] mb-12 rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                alt="Private Label Manufacturing Process"
                className="w-full h-full object-cover"
                width={1200}
                height={675}
              />
            </div>

            {/* Table of Contents */}
            <div className="bg-gray-50 p-8 mb-12 border-l-4 border-gray-900">
              <h2 className="text-gray-900 mb-4" style={{ fontSize: '20px', fontWeight: 700 }}>
                Table of Contents
              </h2>
              <ol className="space-y-2">
                {[
                  'What is Private Label Manufacturing?',
                  'The Manufacturing Process',
                  'Design and Sampling',
                  'Bulk Production',
                  'Quality Control',
                  'Packaging and Delivery'
                ].map((item, index) => (
                  <li key={index} className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors" style={{ fontSize: '16px' }}>
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-gray-900 mb-4" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.3 }}>
                What is Private Label Manufacturing?
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                Private label manufacturing is a process where manufacturers produce clothing items that are branded and sold by another company. This allows brands to sell products without investing in their own production facilities.
              </p>

              <h2 className="text-gray-900 mb-4 mt-12" style={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.3 }}>
                The Manufacturing Process
              </h2>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                The private label manufacturing process involves several key stages, from initial consultation to final delivery. Understanding each step helps brands work effectively with manufacturers.
              </p>

              <h3 className="text-gray-900 mb-3 mt-8" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.4 }}>
                1. Initial Consultation
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                The process begins with discussing your requirements, including product type, quantity, budget, and timeline. This helps manufacturers understand your vision and provide accurate quotes.
              </p>

              <h3 className="text-gray-900 mb-3 mt-8" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.4 }}>
                2. Design and Sampling
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                Based on your designs or concepts, manufacturers create physical samples. This stage includes multiple iterations until the sample meets your specifications for fit, quality, and appearance.
              </p>

              {/* Mid-Article CTA */}
              <div className="bg-gray-900 p-10 my-12 text-center rounded-sm">
                <h3 className="text-white mb-4" style={{ fontSize: '28px', fontWeight: 700 }}>
                  Looking for a Private Label Manufacturer in Bangalore?
                </h3>
                <p className="text-white/90 mb-6" style={{ fontSize: '17px' }}>
                  Get started with our comprehensive private label manufacturing services
                </p>
                <Link
                  to="/contact-apparel-manufacturer-bangalore"
                  className="inline-block bg-white text-gray-900 px-8 py-4 hover:bg-gray-100 transition-colors"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Contact Us
                </Link>
              </div>

              <h3 className="text-gray-900 mb-3 mt-8" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.4 }}>
                3. Bulk Production
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                Once samples are approved, bulk production begins. Manufacturers typically require a deposit before starting production. The timeline depends on order quantity and complexity.
              </p>

              <h3 className="text-gray-900 mb-3 mt-8" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.4 }}>
                4. Quality Control
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                Throughout production, quality checks ensure consistency. Final inspection happens before packaging, where each garment is checked for defects, sizing, and finishing quality.
              </p>

              <h3 className="text-gray-900 mb-3 mt-8" style={{ fontSize: '24px', fontWeight: 600, lineHeight: 1.4 }}>
                5. Packaging and Delivery
              </h3>
              <p className="text-gray-600 mb-6" style={{ fontSize: '18px', lineHeight: 1.8 }}>
                Finished products are packaged according to your specifications, including poly bags, custom boxes, labels, and hang tags. Products are then shipped to your designated location.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2 className="text-gray-900 mb-8" style={{ fontSize: '32px', fontWeight: 700 }}>
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            {relatedPosts.map((post, index) => (
              <Link
                key={index}
                to={post.link}
                className="group bg-white border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={225}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 group-hover:text-gray-700 transition-colors" style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

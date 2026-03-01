import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Search } from 'lucide-react';

export function Blog() {
  const featuredPost = {
    title: 'Private Label Manufacturing Process Explained',
    excerpt: 'A comprehensive guide to understanding the complete private label manufacturing workflow from concept to delivery.',
    image: 'https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    link: '/blog/private-label-manufacturing-process',
    category: 'Manufacturing',
    date: 'February 15, 2026'
  };

  const blogPosts = [
    {
      title: 'How to Choose a Clothing Manufacturer in India',
      excerpt: 'Essential factors to consider when selecting the right manufacturing partner for your clothing brand.',
      image: 'https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/blog/clothing-manufacturer-india-guide',
      category: 'Guides',
      date: 'February 20, 2026'
    },
    {
      title: 'Best Fabric for T-Shirts Guide',
      excerpt: 'Understanding different fabric types, GSM, and how to choose the right material for your t-shirt line.',
      image: 'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/blog/best-fabric-for-tshirts',
      category: 'Products',
      date: 'February 18, 2026'
    },
    {
      title: 'Minimum Order Quantities Explained',
      excerpt: 'Why manufacturers have MOQs and how to work with minimum order requirements effectively.',
      image: 'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '#',
      category: 'Business',
      date: 'February 12, 2026'
    },
    {
      title: 'Quality Control in Garment Manufacturing',
      excerpt: 'Understanding quality assurance processes and what to expect from your manufacturing partner.',
      image: 'https://images.unsplash.com/photo-1716191299945-4c5b89703971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '#',
      category: 'Manufacturing',
      date: 'February 10, 2026'
    },
    {
      title: 'Sustainable Practices in Apparel Manufacturing',
      excerpt: 'How modern manufacturers are adopting eco-friendly practices and sustainable production methods.',
      image: 'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '#',
      category: 'Sustainability',
      date: 'February 8, 2026'
    },
    {
      title: 'Custom Branding Options for Private Label',
      excerpt: 'Exploring different branding techniques including printing, embroidery, and labeling options.',
      image: 'https://images.unsplash.com/photo-1724155090003-fd4e48ab8c8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '#',
      category: 'Branding',
      date: 'February 5, 2026'
    }
  ];

  const categories = ['All', 'Manufacturing', 'Guides', 'Products', 'Business', 'Sustainability', 'Branding'];

  return (
    <>
      <PageHero
        title="Apparel Manufacturing Blog & Guides"
        subtitle="Expert insights, manufacturing guides, and industry knowledge for apparel brands"
        dark={false}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-16">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                style={{ fontSize: '15px' }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 border transition-colors ${
                    category === 'All'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'border-gray-300 text-gray-700 hover:border-gray-900'
                  }`}
                  style={{ fontSize: '14px', fontWeight: 500 }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <Link to={featuredPost.link} className="group block mb-16">
            <div className="grid lg:grid-cols-2 gap-8 bg-gray-50 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-gray-600 mb-3" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.5px' }}>
                  FEATURED • {featuredPost.category}
                </div>
                <h2 className="text-gray-900 mb-4 group-hover:text-gray-700 transition-colors" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2 }}>
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                  {featuredPost.excerpt}
                </p>
                <div className="text-gray-500" style={{ fontSize: '14px' }}>
                  {featuredPost.date}
                </div>
              </div>
            </div>
          </Link>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
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
                  />
                </div>
                <div className="p-6">
                  <div className="text-gray-500 mb-2" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px' }}>
                    {post.category}
                  </div>
                  <h3 className="text-gray-900 mb-3 group-hover:text-gray-700 transition-colors" style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4" style={{ fontSize: '15px', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                  <div className="text-gray-500" style={{ fontSize: '13px' }}>
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

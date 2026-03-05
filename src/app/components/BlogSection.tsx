export function BlogSection() {
  const blogs = [
    {
      title: 'How to Choose a Clothing Manufacturer in India',
      image: 'https://images.unsplash.com/photo-1768746350424-ee28a364dcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/blog/clothing-manufacturer-india-guide',
      excerpt: 'A comprehensive guide to selecting the right manufacturing partner for your clothing brand.'
    },
    {
      title: 'Private Label Manufacturing Process Explained',
      image: 'https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/blog/private-label-manufacturing-process',
      excerpt: 'Understanding the complete private label manufacturing workflow from design to delivery.'
    },
    {
      title: 'Best Fabric for T-Shirts Guide',
      image: 'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      link: '/blog/best-fabric-for-tshirts',
      excerpt: 'Expert insights on choosing the right fabric for your t-shirt manufacturing needs.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="blog">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <h2 className="text-gray-900 text-center mb-10 md:mb-16" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
          Latest Insights on Apparel Manufacturing
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.link}
              className="group bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-gray-900 mb-2 md:mb-3 group-hover:text-gray-700 transition-colors" style={{ fontSize: 'clamp(1rem, 1.35vw, 1.25rem)', fontWeight: 600, lineHeight: 1.4 }}>
                  {blog.title}
                </h3>
                <p className="text-gray-600" style={{ fontSize: 'clamp(0.85rem, 1vw, 0.9375rem)', lineHeight: 1.6 }}>
                  {blog.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

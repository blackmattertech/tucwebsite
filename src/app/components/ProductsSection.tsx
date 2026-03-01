import { Link } from 'react-router';

export function ProductsSection() {
  const products = [
    {
      title: 'T-Shirt Manufacturer Bangalore',
      image: 'https://images.unsplash.com/photo-1485920784995-d65789b1c3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/products/t-shirt-manufacturer-bangalore'
    },
    {
      title: 'Hoodie Manufacturer India',
      image: 'https://images.unsplash.com/photo-1667586680656-6b8e381cddb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/products/hoodie-manufacturer-india'
    },
    {
      title: 'Shirt Manufacturer Bangalore',
      image: 'https://images.unsplash.com/photo-1765614766382-2ff118e9095d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      link: '/products/shirt-manufacturer-bangalore'
    }
  ];

  return (
    <section className="py-24 bg-white" id="products">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-gray-900 text-center mb-16" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
          Knitwear Products We Manufacture
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <Link
              key={index}
              to={product.link}
              className="group relative overflow-hidden bg-gray-100 aspect-[3/4]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white" style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.3 }}>
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-block bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
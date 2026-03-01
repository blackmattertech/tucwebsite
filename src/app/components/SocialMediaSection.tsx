import { Instagram } from 'lucide-react';

export function SocialMediaSection() {
  const posts = [
    'https://images.unsplash.com/photo-1771315938116-cd51af9489fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1758271141001-e4ff47f2b1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1684259499086-93cb3e555803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    'https://images.unsplash.com/photo-1771098206750-6be5aef4f503?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="text-gray-900" size={32} />
            <h2 className="text-gray-900" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.2 }}>
              Inside Our Apparel Manufacturing Facility
            </h2>
          </div>
          <p className="text-gray-600" style={{ fontSize: '18px' }}>
            Follow us @apparelmfg for daily updates
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <a
              key={index}
              href="#"
              className="group relative aspect-square overflow-hidden bg-gray-100"
            >
              <img
                src={post}
                alt={`Manufacturing facility post ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

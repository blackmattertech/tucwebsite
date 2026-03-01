interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  dark?: boolean;
}

export function PageHero({ title, subtitle, backgroundImage, dark = true }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      {backgroundImage && (
        <>
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute inset-0 ${dark ? 'bg-black/60' : 'bg-white/80'}`} />
        </>
      )}
      
      <div className={`relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 ${backgroundImage ? 'text-center' : ''}`}>
        <h1 
          className={`mb-4 ${backgroundImage && dark ? 'text-white' : 'text-gray-900'}`}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p 
            className={`max-w-3xl ${backgroundImage ? 'mx-auto' : ''} ${backgroundImage && dark ? 'text-white/90' : 'text-gray-600'}`}
            style={{ fontSize: 'clamp(1.125rem, 2vw, 1.25rem)', lineHeight: 1.6 }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

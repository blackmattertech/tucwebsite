import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about-apparel-manufacturer-bangalore' },
    { label: 'Capabilities', href: '/capabilities' },
    { label: 'Products', href: '/products' },
    { label: 'Blog', href: '/blog-apparel-manufacturing-guides' },
    { label: 'Contact', href: '/contact-apparel-manufacturer-bangalore' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 shadow-md backdrop-blur-md' : 'bg-black/20 backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo with SEO alt */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="TAG UNLIMITED - Private Label Apparel Manufacturer Bangalore"
              className="h-10 w-auto"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/90'}
                style={{ fontSize: '15px', fontWeight: 500 }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Link 
              to="/get-production-quote"
              className="inline-block bg-white text-gray-900 px-6 py-3 hover:bg-white/90 transition-colors" 
              style={{ fontSize: '15px', fontWeight: 600 }}
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-white/20">
          <nav className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block text-gray-700 hover:text-gray-900 transition-colors py-2"
                style={{ fontSize: '16px', fontWeight: 500 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/get-production-quote"
              className="block w-full text-center bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors mt-4" 
              style={{ fontSize: '15px', fontWeight: 600 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
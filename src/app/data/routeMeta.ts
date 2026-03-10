/**
 * Per-route SEO: title and meta description for each path.
 * Used by PageMeta to set document.title and meta name="description".
 */
const BASE = typeof import.meta.env !== 'undefined' && (import.meta.env as { VITE_APP_URL?: string }).VITE_APP_URL
  ? (import.meta.env as { VITE_APP_URL: string }).VITE_APP_URL.replace(/\/$/, '')
  : 'https://tucwebsite.vercel.app';

export const APP_BASE_URL = BASE;

export interface RouteMeta {
  title: string;
  description: string;
}

const defaultMeta: RouteMeta = {
  title: 'Premium Apparel Manufacturer | Custom Clothing & Private Label Production',
  description: 'Leading apparel manufacturer offering custom clothing, private label production, and bulk garment manufacturing with premium quality and on-time delivery.',
};

/** Pathname (no trailing slash) -> meta. Use exact match then fallback to default. */
export const ROUTE_META: Record<string, RouteMeta> = {
  '/': defaultMeta,
  '/about-apparel-manufacturer-bangalore': {
    title: 'About Us | Apparel Manufacturer Bangalore | TAG Unlimited Clothing',
    description: 'We let our threads do the talking. Meet TAG Unlimited Clothing – your trusted apparel manufacturing partner in Bangalore for private label and bulk garment production.',
  },
  '/capabilities/best-tshirt-manufacturer-in-india': {
    title: 'Capabilities | Best T-Shirt Manufacturer in India | Apparel Manufacturing Bangalore',
    description: 'End-to-end apparel manufacturing capabilities: design, sourcing, private label clothing, and garment factory infrastructure in Bangalore.',
  },
  '/capabilities/apparel-manufacturing-bangalore': {
    title: 'Apparel Manufacturing Bangalore | Custom Garment Production',
    description: 'Full-service apparel manufacturing in Bangalore. From design to delivery – custom clothing, bulk orders, and export-quality garments.',
  },
  '/capabilities/private-label-clothing-manufacturer': {
    title: 'Private Label Clothing Manufacturer | Brand Your Apparel',
    description: 'Private label clothing manufacturing for brands. Custom labels, packaging, and bulk production with your branding in Bangalore.',
  },
  '/capabilities/garment-factory-infrastructure': {
    title: 'Garment Factory Infrastructure | Manufacturing Facility Bangalore',
    description: 'State-of-the-art garment factory infrastructure. In-house cutting, stitching, and quality control for consistent apparel manufacturing.',
  },
  '/products': {
    title: 'Products | T-Shirts, Hoodies, Shirts Manufacturer Bangalore',
    description: 'Browse our product range: T-shirts, hoodies, formal and casual shirts, polo shirts, and more. Bulk apparel manufacturing in Bangalore.',
  },
  '/products/t-shirt-manufacturer-bangalore': {
    title: 'T-Shirt Manufacturer Bangalore | Bulk & Custom T-Shirts',
    description: 'Premium T-shirt manufacturing in Bangalore. Custom and bulk T-shirts, polo shirts, round necks. Private label and OEM orders welcome.',
  },
  '/products/hoodie-manufacturer-india': {
    title: 'Hoodie Manufacturer India | Custom Hoodies & Sweatshirts',
    description: 'Quality hoodie and sweatshirt manufacturing in India. Custom hoodies, zip-ups, and bulk orders for brands and businesses.',
  },
  '/products/shirt-manufacturer-bangalore': {
    title: 'Shirt Manufacturer Bangalore | Formal & Casual Shirts',
    description: 'Formal and casual shirt manufacturing in Bangalore. Dress shirts, casual shirts, and bulk orders with premium fabrics and finish.',
  },
  '/blog-apparel-manufacturing-guides': {
    title: 'Apparel Manufacturing Guides & Blog | TAG Unlimited Clothing',
    description: 'Guides and insights on apparel manufacturing, private label process, fabrics, and garment production in India.',
  },
  '/blog/private-label-manufacturing-process': {
    title: 'Private Label Manufacturing Process | Step-by-Step Guide',
    description: 'How the private label clothing manufacturing process works – from design to delivery. Guide for brands and businesses.',
  },
  '/blog/clothing-manufacturer-india-guide': {
    title: 'Clothing Manufacturer India Guide | How to Choose a Partner',
    description: 'A practical guide to choosing a clothing manufacturer in India. MOQ, quality, lead times, and what to expect.',
  },
  '/blog/best-fabric-for-tshirts': {
    title: 'Best Fabric for T-Shirts | Cotton, Blends & Quality Guide',
    description: 'Choosing the best fabric for T-shirts: cotton, blends, GSM, and quality factors for comfort and durability.',
  },
  '/social': {
    title: 'Social | TAG Unlimited Clothing – Apparel Manufacturer',
    description: 'Connect with TAG Unlimited Clothing. Follow us for updates on apparel manufacturing, private label, and garment production.',
  },
};

/** Get meta for pathname (normalized: no trailing slash). */
export function getRouteMeta(pathname: string): RouteMeta {
  const path = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/';
  return ROUTE_META[path] ?? defaultMeta;
}

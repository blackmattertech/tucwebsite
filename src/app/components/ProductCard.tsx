import { OptimizedImage } from './OptimizedImage';
import { useCatalogue } from '../context/useCatalogue';
import type { ProductWeManufacture } from '../data/productsWeManufacture';
import './ProductCard.css';

/** Short description for card (show more text). */
function shortDescription(description: string, maxLength = 220): string {
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trim() + '…';
}

interface ProductCardProps {
  product: ProductWeManufacture;
}

export function ProductCard({ product }: ProductCardProps) {
  const shortDesc = shortDescription(product.description);
  const { openCatalogue } = useCatalogue() ?? {};

  return (
    <div className="product-card-wrapper">
      <div className="product-card">
        <div className="product-image-wrap">
          <OptimizedImage
            src={product.imageSrc}
            alt={product.imageAlt}
            width={1200}
            height={1200}
            quality={88}
            sizes="(min-width: 960px) 50vw, 100vw"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="bottom-bg" aria-hidden />
        <div className="bottom">
          <div className="content">
            <span className="name">{product.heading}</span>
            <span className="about-me">{shortDesc}</span>
          </div>
          <div className="bottom-bottom">
            <button
              type="button"
              className="button"
              onClick={() => openCatalogue?.()}
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

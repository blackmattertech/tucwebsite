import { getOptimizedImageUrl } from '../lib/optimizedImage';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width: number;
  height: number;
  quality?: number;
  /** Skip optimization (e.g. for SVG, already-optimized local assets) */
  unoptimized?: boolean;
};

/**
 * Image component that routes remote images through Vercel Image Optimization.
 * Use for Supabase and Unsplash images to serve WebP/AVIF via CDN.
 */
export function OptimizedImage({
  src,
  width,
  height,
  quality = 75,
  unoptimized = false,
  alt = '',
  className,
  loading,
  decoding = 'async',
  ...rest
}: OptimizedImageProps) {
  const imgSrc =
    unoptimized || src.startsWith('data:') || src.endsWith('.svg')
      ? src
      : getOptimizedImageUrl(src, width, quality);

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}

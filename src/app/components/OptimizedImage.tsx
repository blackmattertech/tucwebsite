import { getOptimizedImageUrl, getOptimizedImageSrcSet } from '../lib/optimizedImage';

type OptimizedImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  width: number;
  height: number;
  quality?: number;
  /** Skip optimization (e.g. for SVG, already-optimized local assets) */
  unoptimized?: boolean;
  /** Responsive: sizes attribute (e.g. "(max-width: 768px) 100vw, 800px"). When set, srcSet is auto-generated unless provided. */
  sizes?: string;
  /** Optional explicit srcSet; otherwise derived from sizes + src when sizes is set. */
  srcSet?: string;
};

/**
 * Image component that routes remote images through Vercel Image Optimization or ImageKit.
 * Supports responsive srcset + sizes for smaller mobile payloads. Use loading="lazy" below the fold.
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
  sizes: sizesProp,
  srcSet: srcSetProp,
  ...rest
}: OptimizedImageProps) {
  const skipOpt = unoptimized || src.startsWith('data:') || src.endsWith('.svg');
  const imgSrc = skipOpt ? src : getOptimizedImageUrl(src, width, quality);
  const srcSet =
    srcSetProp ??
    (sizesProp && !skipOpt ? getOptimizedImageSrcSet(src, quality) : undefined);
  const sizes = sizesProp;

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      srcSet={srcSet || undefined}
      sizes={sizes || undefined}
      {...rest}
    />
  );
}

/**
 * Desktop-only card stack. Lazy-loaded so mobile never downloads CardSwap/GSAP.
 * Rendered only when CapabilitiesSection detects !isMobile.
 */
import CardSwap, { Card } from '../../components/CardSwap';
import { OptimizedImage } from './OptimizedImage';

const CAPABILITY_ITEMS = [
  { image: 'Deep Design Proficiency.webp', label: 'Deep Design Proficiency' },
  { image: 'Expert Product Development.webp', label: 'Expert Product Development' },
  { image: 'End-to-End Garment Manufacturing.webp', label: 'End-to-End Garment Manufacturing' },
  { image: 'image.webp', label: 'ERP-Driven Production Managements' },
] as const;

function CardContent({
  image,
  label,
  errored,
  onError,
  getUrl,
}: {
  image: string;
  label: string;
  errored: boolean;
  onError: () => void;
  getUrl: (folder: string, file_name: string) => string;
}) {
  if (errored) {
    return (
      <div className="capability-card-fallback">
        <span>{label}</span>
      </div>
    );
  }
  return (
    <OptimizedImage
      src={getUrl('other images', image)}
      alt={label}
      onError={onError}
      width={640}
      height={450}
      loading="lazy"
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover block"
      style={{ borderRadius: 12 }}
    />
  );
}

export interface CapabilitiesSectionDesktopProps {
  getUrl: (folder: string, file_name: string) => string;
  imageErrored: Record<number, boolean>;
  onImageError: (index: number) => void;
  onFrontCardChange: (index: number) => void;
  frontIndexRef: React.MutableRefObject<number | null>;
  jumpToIndex: number | null;
  cardDims: { width: number; height: number };
}

export function CapabilitiesSectionDesktop({
  getUrl,
  imageErrored,
  onImageError,
  onFrontCardChange,
  frontIndexRef,
  jumpToIndex,
  cardDims,
}: CapabilitiesSectionDesktopProps) {
  return (
    <div className="capabilities-cardswap-wrapper">
      <CardSwap
        width={cardDims.width}
        height={cardDims.height}
        cardDistance={40}
        verticalDistance={50}
        delay={3000}
        pauseOnHover
        initialFrontIndex={jumpToIndex ?? undefined}
        onFrontCardChange={onFrontCardChange}
        frontIndexRef={frontIndexRef}
      >
        {CAPABILITY_ITEMS.map(({ image, label }, index) => (
          <Card key={label}>
            <CardContent
              image={image}
              label={label}
              errored={!!imageErrored[index]}
              onError={() => onImageError(index)}
              getUrl={getUrl}
            />
          </Card>
        ))}
      </CardSwap>
    </div>
  );
}

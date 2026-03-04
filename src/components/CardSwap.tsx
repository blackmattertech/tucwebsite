import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import gsap from 'gsap';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, className, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
  )
);
Card.displayName = 'Card';

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement | null, slot: Slot, skew: number): void => {
  if (!el) return;
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });
};

export interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onFrontCardChange?: (index: number) => void;
  /** Parent ref so text always updates when cards swap (avoids stale callback). */
  setFrontIndexRef?: React.MutableRefObject<((index: number) => void) | undefined>;
  /** Optional: parent's setState ref for direct index updates. */
  setFrontCardIndexRef?: React.MutableRefObject<React.Dispatch<React.SetStateAction<number>> | undefined>;
  skewAmount?: number;
  easing?: 'elastic' | string;
  /** When set, this card index is shown at front (e.g. after user clicks a tab). */
  initialFrontIndex?: number;
  /** Optional ref we keep updated with the current front card index so parent can sync text/pill. */
  frontIndexRef?: React.MutableRefObject<number | null>;
  children?: React.ReactNode;
}

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onFrontCardChange,
  setFrontIndexRef,
  setFrontCardIndexRef,
  skewAmount = 6,
  easing = 'elastic',
  initialFrontIndex,
  frontIndexRef,
  children,
}: CardSwapProps) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)' as const,
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut' as const,
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr.length]
  );

  const total = childArr.length;
  const initialOrder =
    typeof initialFrontIndex === 'number' && initialFrontIndex >= 0 && initialFrontIndex < total
      ? [
          initialFrontIndex,
          ...Array.from({ length: total }, (_, i) => i).filter((i) => i !== initialFrontIndex),
        ]
      : Array.from({ length: total }, (_, i) => i);
  const order = useRef(initialOrder);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);
  const onFrontCardChangeRef = useRef(onFrontCardChange);
  onFrontCardChangeRef.current = onFrontCardChange;
  const swapImplRef = useRef<(() => void) | null>(null);

  // Keep refs/callback current so swap() always notifies the latest handler
  const parentNotifyRef = useRef({
    setFrontIndexRef,
    setFrontCardIndexRef,
    onFrontCardChange,
  });
  parentNotifyRef.current = {
    setFrontIndexRef,
    setFrontCardIndexRef,
    onFrontCardChange,
  };

  useEffect(() => {
    if (
      typeof initialFrontIndex === 'number' &&
      initialFrontIndex >= 0 &&
      initialFrontIndex < total
    ) {
      order.current = [
        initialFrontIndex,
        ...Array.from({ length: total }, (_, i) => i).filter((i) => i !== initialFrontIndex),
      ];
      frontIndexRef && (frontIndexRef.current = initialFrontIndex);
      parentNotifyRef.current.onFrontCardChange?.(initialFrontIndex);
    }
  }, [initialFrontIndex, total]);

  useEffect(() => {
    refs.forEach((r, refIndex) => {
      const position = order.current.indexOf(refIndex);
      if (position !== -1) {
        placeNow(r.current, makeSlot(position, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    // Keep parent text in sync with which card is actually at the front
    const currentFrontIndex = order.current[0];
    if (typeof currentFrontIndex === 'number') {
      frontIndexRef && (frontIndexRef.current = currentFrontIndex);
      parentNotifyRef.current.onFrontCardChange?.(currentFrontIndex);
    }

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const newFrontIndex = rest[0];
      const notifyParent = (index: number) => {
        const next = Math.max(0, Math.min(index, total - 1));
        frontIndexRef && (frontIndexRef.current = next);
        const { setFrontIndexRef: sfi, setFrontCardIndexRef: sfci, onFrontCardChange: onFc } =
          parentNotifyRef.current;
        sfci?.current?.(next);
        sfi?.current?.(index);
        onFc?.(index);
      };
      // Update parent immediately so title/description match the front card as soon as we swap
      notifyParent(newFrontIndex);
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          if (elFront) gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
        // Notify parent only when the new card is actually at the front (text stays in sync with visible card)
        notifyParent(newFrontIndex);
      });
    };

    swapImplRef.current = swap;

    const skipImmediateSwap =
      typeof initialFrontIndex === 'number' && initialFrontIndex >= 0 && initialFrontIndex < total;
    const isDefaultOrder =
      order.current[0] === 0 &&
      order.current.length === total &&
      order.current.every((v, i) => order.current[i] === i);
    if (!skipImmediateSwap && isDefaultOrder) {
      swap();
    }
    const runSwap = () => swapImplRef.current?.();
    intervalRef.current = window.setInterval(runSwap, delay) as unknown as number;

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(runSwap, delay) as unknown as number;
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, initialFrontIndex]);

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;
    const props = child.props as { style?: React.CSSProperties; onClick?: (e: React.MouseEvent<HTMLDivElement>) => void };
    return cloneElement(child, {
      key: child.key ?? i,
      ref: refs[i],
      style: { width, height, ...(props.style ?? {}) },
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        props.onClick?.(e);
        onCardClick?.(i);
      },
    } as React.HTMLAttributes<HTMLDivElement> & { ref: React.RefObject<HTMLDivElement> });
  });

  return (
    <div
      ref={container}
      className="card-swap-container absolute bottom-0 right-0 translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:-translate-x-1/2 max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:-translate-x-1/2 max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;

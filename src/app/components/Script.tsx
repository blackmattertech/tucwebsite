import { useEffect, useRef } from 'react';

export type ScriptStrategy = 'afterInteractive' | 'lazyOnload';

export interface ScriptProps {
  /** External script URL to load */
  src?: string;
  /** Inline script content (use with caution) */
  children?: string;
  /** Loading strategy - afterInteractive: after hydration; lazyOnload: after window load / idle */
  strategy?: ScriptStrategy;
  /** Callback when script loads */
  onLoad?: () => void;
  /** Callback when script errors */
  onError?: (e: Error) => void;
  /** Script attributes (id, async, defer, etc.) */
  id?: string;
  async?: boolean;
  defer?: boolean;
  /** Additional HTML script attributes */
  [key: string]: string | boolean | undefined | (() => void) | ((e: Error) => void) | unknown;
}

/**
 * Vite/React equivalent of Next.js next/script.
 * Loads third-party scripts with optimized strategies so they don't block initial render.
 *
 * - afterInteractive: Loads after React hydration (DOM ready). Use for necessary scripts.
 * - lazyOnload: Loads after window load or during idle. Use for analytics, chat widgets.
 */
export function Script({
  src,
  children,
  strategy = 'afterInteractive',
  onLoad,
  onError,
  id,
  async = true,
  defer = true,
  ...rest
}: ScriptProps) {
  const executedRef = useRef(false);

  useEffect(() => {
    if (executedRef.current) return;
    if (!src && !children) return;

    const execute = () => {
      if (executedRef.current) return;
      executedRef.current = true;

      const script = document.createElement('script');
      if (id) script.id = id;
      script.async = async;
      script.defer = defer;

      if (src) {
        script.src = src;
        script.onload = () => onLoad?.();
        script.onerror = () => onError?.(new Error(`Failed to load script: ${src}`));
      }
      if (children) {
        script.textContent = children;
      }

      // Set additional HTML attributes (e.g. data-*, crossorigin)
      Object.entries(rest).forEach(([k, v]) => {
        if (typeof v === 'string' || typeof v === 'boolean') {
          script.setAttribute(k, String(v));
        }
      });

      document.body.appendChild(script);
    };

    if (strategy === 'lazyOnload') {
      const load = () => {
        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(
            execute,
            { timeout: 2000 }
          );
        } else {
          setTimeout(execute, 1);
        }
      };
      if (document.readyState === 'complete') {
        load();
      } else {
        window.addEventListener('load', load);
        return () => window.removeEventListener('load', load);
      }
    } else {
      // afterInteractive: run on mount (after hydration)
      execute();
    }
  }, [src, children, strategy, id, async, defer, onLoad, onError]);

  return null;
}

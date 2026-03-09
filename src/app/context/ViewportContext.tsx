import React, { createContext, useContext, useEffect, useState } from 'react';

/** Breakpoint above which we consider "desktop" and load desktop-only JS/CSS. */
const DESKTOP_BREAKPOINT_PX = 1024;

type ViewportContextValue = {
  isDesktop: boolean;
  isMobile: boolean;
  /** True only after first measurement (avoids flash on desktop). */
  ready: boolean;
};

const ViewportContext = createContext<ViewportContextValue>({
  isDesktop: false,
  isMobile: true,
  ready: false,
});

export function ViewportProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<ViewportContextValue>({
    isDesktop: false,
    isMobile: true,
    ready: false,
  });

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`);
    const update = () => {
      const isDesktop = mq.matches;
      setValue({
        isDesktop,
        isMobile: !isDesktop,
        ready: true,
      });
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <ViewportContext.Provider value={value}>
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  return useContext(ViewportContext);
}

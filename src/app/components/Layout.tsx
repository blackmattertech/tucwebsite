import { Suspense, lazy, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { ContactModalProvider } from '../context/ContactModalContext';
import { ViewportProvider, useViewport } from '../context/ViewportContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { ContactCTASection } from './ContactCTASection';
import { FloatingContactButtons } from './FloatingContactButtons';
import { ContactCircleButton } from './ContactCircleButton';
import { ContactModal } from './ContactModal';
import { ThirdPartyScripts } from './ThirdPartyScripts';
import { PageMeta } from './PageMeta';

/** Loaded only on desktop – not used on mobile. */
const SectionScrollIndicatorsLazy = lazy(() =>
  import('./SectionScrollIndicators').then((m) => ({ default: m.SectionScrollIndicators }))
);

function LayoutContent() {
  const { isDesktop, ready } = useViewport();
  const location = useLocation();
  const showScrollIndicators = ready && isDesktop;
  const isAboutPage = location.pathname.toLowerCase().includes('about-apparel-manufacturer-bangalore');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Prefetch About page chunk when on home so initial load of About has minimal FOUC */
  useEffect(() => {
    if (location.pathname !== '/') return;
    const t = setTimeout(() => {
      import('../pages/About').catch(() => {});
    }, 1500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <PageMeta />
      <ThirdPartyScripts />
      <Header />
      {showScrollIndicators && (
        <Suspense fallback={null}>
          <SectionScrollIndicatorsLazy />
        </Suspense>
      )}
      <div className="fixed top-20 right-3 md:top-24 md:right-4 lg:right-6 z-40">
        <ContactCircleButton />
      </div>
      <main>
        <Suspense fallback={<div className="min-h-[140vh]" aria-hidden />}>
          <Outlet />
        </Suspense>
      </main>
      {!isAboutPage && <ContactCTASection />}
      <Footer />
      <FloatingContactButtons />
      <ContactModal />
    </div>
  );
}

export function Layout() {
  return (
    <ViewportProvider>
      <ContactModalProvider>
        <LayoutContent />
      </ContactModalProvider>
    </ViewportProvider>
  );
}

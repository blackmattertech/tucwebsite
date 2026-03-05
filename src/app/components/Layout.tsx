import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { ContactModalProvider } from '../context/ContactModalContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingContactButtons } from './FloatingContactButtons';
import { ContactCircleButton } from './ContactCircleButton';
import { ContactModal } from './ContactModal';
import { SectionScrollIndicators } from './SectionScrollIndicators';

function LayoutContent() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SectionScrollIndicators />
      <div className="fixed top-20 right-3 md:top-24 md:right-4 lg:right-6 z-40">
        <ContactCircleButton />
      </div>
      <main>
        <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingContactButtons />
      <ContactModal />
    </div>
  );
}

export function Layout() {
  return (
    <ContactModalProvider>
      <LayoutContent />
    </ContactModalProvider>
  );
}

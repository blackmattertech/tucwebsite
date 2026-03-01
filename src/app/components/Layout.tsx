import { Outlet } from 'react-router';
import { ContactModalProvider } from '../context/ContactModalContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingContactButtons } from './FloatingContactButtons';
import { SocialCard } from './SocialCard';
import { ContactCircleButton } from './ContactCircleButton';
import { ContactModal } from './ContactModal';

function LayoutContent() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="fixed top-24 right-4 lg:right-6 z-40 flex items-center gap-3">
        <SocialCard />
        <ContactCircleButton />
      </div>
      <main>
        <Outlet />
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

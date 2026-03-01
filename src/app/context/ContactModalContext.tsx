import React, { createContext, useCallback, useContext, useState } from 'react';

type ContactModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  return ctx;
}

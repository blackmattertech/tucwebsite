import { useContext } from 'react';
import { ContactModalContext } from './ContactModalContext';

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (ctx === null && import.meta.env.DEV) {
    console.error('useContactModal() must be used within a ContactModalProvider.');
  }
  return ctx;
}

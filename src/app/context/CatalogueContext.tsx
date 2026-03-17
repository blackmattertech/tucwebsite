import React, { createContext, useCallback, useState } from 'react';
import { CatalogueSidebar } from '../components/CatalogueSidebar';

type CatalogueContextValue = {
  isOpen: boolean;
  openCatalogue: () => void;
  closeCatalogue: () => void;
};

export const CatalogueContext = createContext<CatalogueContextValue | null>(null);

export function CatalogueProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openCatalogue = useCallback(() => setIsOpen(true), []);
  const closeCatalogue = useCallback(() => setIsOpen(false), []);

  return (
    <CatalogueContext.Provider value={{ isOpen, openCatalogue, closeCatalogue }}>
      {children}
      <CatalogueSidebar isOpen={isOpen} onClose={closeCatalogue} />
    </CatalogueContext.Provider>
  );
}

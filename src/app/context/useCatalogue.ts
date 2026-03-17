import { useContext } from 'react';
import { CatalogueContext } from './CatalogueContext';

export function useCatalogue() {
  const ctx = useContext(CatalogueContext);
  if (ctx === null && import.meta.env.DEV) {
    console.error('useCatalogue() must be used within a CatalogueProvider.');
  }
  return ctx;
}

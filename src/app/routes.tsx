import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';

/** Retry a dynamic import (e.g. after dev server restart or network blip). */
function lazyWithRetry<T>(
  importFn: () => Promise<T>,
  retries = 2,
  delay = 1000
): () => Promise<T> {
  return () =>
    importFn().catch((err) => {
      if (retries <= 0) throw err;
      return new Promise((resolve, reject) => {
        setTimeout(() => lazyWithRetry(importFn, retries - 1, delay)().then(resolve).catch(reject), delay);
      });
    });
}

const Home = lazy(
  lazyWithRetry(() => import('./pages/Home').then((m) => ({ default: m.Home })))
);
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Capabilities = lazy(() => import('./pages/Capabilities').then((m) => ({ default: m.Capabilities })));
const Manufacturing = lazy(() => import('./pages/Manufacturing').then((m) => ({ default: m.Manufacturing })));
const PrivateLabel = lazy(() => import('./pages/PrivateLabel').then((m) => ({ default: m.PrivateLabel })));
const Infrastructure = lazy(() => import('./pages/Infrastructure').then((m) => ({ default: m.Infrastructure })));
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })));
const TShirtManufacturer = lazy(() => import('./pages/TShirtManufacturer').then((m) => ({ default: m.TShirtManufacturer })));
const HoodieManufacturer = lazy(() => import('./pages/HoodieManufacturer').then((m) => ({ default: m.HoodieManufacturer })));
const ShirtManufacturer = lazy(() => import('./pages/ShirtManufacturer').then((m) => ({ default: m.ShirtManufacturer })));
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then((m) => ({ default: m.BlogPost })));
const Social = lazy(() => import('./pages/Social').then((m) => ({ default: m.Social })));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    errorElement: (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Something went wrong</h1>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          The page failed to load. This can happen after a refresh or when the dev server restarts.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            background: '#fecc00',
            border: 'none',
            borderRadius: 6,
          }}
        >
          Reload page
        </button>
      </div>
    ),
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'about-apparel-manufacturer-bangalore',
        Component: About
      },
      {
        path: 'capabilities/best-tshirt-manufacturer-in-india',
        Component: Capabilities
      },
      {
        path: 'capabilities/apparel-manufacturing-bangalore',
        Component: Manufacturing
      },
      {
        path: 'capabilities/private-label-clothing-manufacturer',
        Component: PrivateLabel
      },
      {
        path: 'capabilities/garment-factory-infrastructure',
        Component: Infrastructure
      },
      {
        path: 'products',
        Component: Products
      },
      {
        path: 'products/t-shirt-manufacturer-bangalore',
        Component: TShirtManufacturer
      },
      {
        path: 'products/hoodie-manufacturer-india',
        Component: HoodieManufacturer
      },
      {
        path: 'products/shirt-manufacturer-bangalore',
        Component: ShirtManufacturer
      },
      {
        path: 'blog-apparel-manufacturing-guides',
        Component: Blog
      },
      {
        path: 'blog/private-label-manufacturing-process',
        Component: BlogPost
      },
      {
        path: 'blog/clothing-manufacturer-india-guide',
        Component: BlogPost
      },
      {
        path: 'blog/best-fabric-for-tshirts',
        Component: BlogPost
      },
      {
        path: 'social',
        Component: Social
      }
    ]
  }
]);
import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
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
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Social = lazy(() => import('./pages/Social').then((m) => ({ default: m.Social })));

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
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
        path: 'capabilities',
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
        path: 'contact-apparel-manufacturer-bangalore',
        Component: Contact
      },
      {
        path: 'social',
        Component: Social
      }
    ]
  }
]);
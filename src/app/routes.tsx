import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Capabilities } from './pages/Capabilities';
import { Manufacturing } from './pages/Manufacturing';
import { PrivateLabel } from './pages/PrivateLabel';
import { Infrastructure } from './pages/Infrastructure';
import { Products } from './pages/Products';
import { TShirtManufacturer } from './pages/TShirtManufacturer';
import { HoodieManufacturer } from './pages/HoodieManufacturer';
import { ShirtManufacturer } from './pages/ShirtManufacturer';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { Quote } from './pages/Quote';

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
        path: 'get-production-quote',
        Component: Quote
      }
    ]
  }
]);
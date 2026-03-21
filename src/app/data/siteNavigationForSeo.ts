/**
 * Main site URLs + labels for JSON-LD (WebSite + ItemList).
 * Matches Header nav and key sitemap pages so search engines map sitelinks to the correct names
 * (e.g. About, Social) instead of random text from the page body.
 */
export type SiteNavSeoItem = {
  name: string;
  /** Path starting with / (home is "/") */
  path: string;
};

export const SITE_MAIN_NAV_FOR_SCHEMA: SiteNavSeoItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about-apparel-manufacturer-bangalore' },
  { name: 'Capabilities', path: '/capabilities/best-tshirt-manufacturer-in-india' },
  { name: 'Products', path: '/products' },
  { name: 'Blog', path: '/blog-apparel-manufacturing-guides' },
  { name: 'Social', path: '/social' },
  { name: 'Contact', path: '/#contact' },
];

function absoluteUrl(base: string, path: string): string {
  const root = base.replace(/\/$/, '');
  if (path === '/') return `${root}/`;
  if (path.startsWith('/#')) return `${root}${path}`;
  return `${root}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Extra @graph nodes: WebSite (publisher → Organization) + ItemList of main WebPages.
 * Append alongside existing Organization / LocalBusiness / FAQ JSON-LD (same origin, shared @id).
 */
export function buildSiteStructureSchemaGraph(baseUrl: string): Record<string, unknown>[] {
  const base = baseUrl.replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const websiteId = `${base}/#website`;

  const itemListElement = SITE_MAIN_NAV_FOR_SCHEMA.map((entry, i) => {
    const url = absoluteUrl(base, entry.path);
    return {
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'WebPage',
        name: entry.name,
        url,
      },
    };
  });

  return [
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Tag Unlimited Clothing',
      url: `${base}/`,
      publisher: { '@id': orgId },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      '@id': `${base}/#main-navigation`,
      name: 'Tag Unlimited Clothing — main pages',
      description:
        'Home, About, Capabilities, Products, Blog, Social, and Contact — apparel manufacturing in Bangalore.',
      numberOfItems: SITE_MAIN_NAV_FOR_SCHEMA.length,
      itemListElement,
    },
  ];
}

import { Menu, Page } from './types';

/**
 * NOTE: This function returns a hardcoded menu structure for demonstration purposes.
 * In a production application, the engineering team should update to retrieve menu content from
 * a CMS or other data source that is appropriate for the project.
 */
export function getMenu(handle: string): Menu[] {
  return getMenus().filter((menu) => menu.handle === handle)[0]?.links || [];
}

/**
 * NOTE: This function currently returns a hardcoded menu structure for demonstration purposes.
 * This should be replaced in a fetch to a CMS or other data source that is appropriate for the project.
 */
export function getMenus() {
  return [
    {
      handle: 'next-js-frontend-footer-menu',
      links: [
        {
          title: 'Home',
          path: '/'
        },
        {
          title: 'About',
          path: '/about'
        },
        {
          title: 'Terms & Conditions',
          path: '/terms-conditions'
        },
        {
          title: 'Shipping & Return Policy',
          path: '/shipping-return-policy'
        },
        {
          title: 'Privacy Policy',
          path: '/privacy-policy'
        },
        {
          title: 'FAQ',
          path: '/freqently-asked-questions'
        }
      ]
    },
    {
      handle: 'next-js-frontend-header-menu',
      links: [
        {
          title: 'New Arrivals',
          path: '/search/newarrivals'
        },
        {
          title: 'Women',
          path: '/search/womens'
        },
        {
          title: 'Men',
          path: '/search/mens'
        }
      ]
    }
  ];
}

/**
 * NOTE: This function currently returns a hardcoded page for demonstration purposes.
 * This should be replaced in a fetch to a CMS or other data source that is appropriate for the project.
 */
export function getPage(handle: string): Page | undefined {
  return getPages().find((page) => page.handle === handle);
}

/**
 * NOTE: This function currently returns hardcoded pages for demonstration purposes.
 * This should be replaced in a fetch to a CMS or other data source that is appropriate for the project.
 */
export function getPages(): Page[] {
  return [homePage, aboutPage, termsPage, shippingPage, privacyPage, faqPage];
}

/*
 * For demonstration purposes, we've opted to hardcode the content for several pages in this project.
 * In a real-world scenario, this content would typically be managed through a CMS to allow for
 * easier updates and content management by non-developers. This hardcoding approach simplifies
 * the setup for now but would be replaced with a CMS in a production environment.
 */
const homePage = {
  id: 'home',
  title: 'Acme Store',
  handle: '',
  body: ``,
  bodySummary:
    'High-performance ecommerce store built with Next.js, Vercel, and Salesforce Commerce Cloud.',
  seo: {
    title: 'Acme Store',
    description:
      'High-performance ecommerce store built with Next.js, Vercel, and Salesforce Commerce Cloud.'
  },
  createdAt: '2024-09-20T20:15:06Z',
  updatedAt: '2024-09-20T20:15:06Z'
};

const aboutPage = {
  id: 'about',
  title: 'About',
  handle: 'about',
  body: `<div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8"><p>This website is built with <a href="https://nextjs.org/commerce" title="Next.js Commerce">Next.js Commerce</a>, which is a ecommerce template for creating a headless Salesforce Commerce Cloud storefront.</p>
<p>Support for real-world commerce features including:</p>
<ul>
<li>Out of stocks</li>
<li>Order history</li>
<li>Order status</li>
<li>Cross variant / option availability (aka. Amazon style)</li>
<li><a href="https://demo.vercel.store/product/acme-webcam-cover" title="Example of a hidden product in Next.js Commerce">Hidden products</a></li>
<li>Dynamically driven features via Salesforce Commerce Cloud (ie. collections, products, recommendations, etc.)</li>
</li>
<li>And more!</li>
</ul>
<p>This template also allows us to highlight newer Next.js features including:</p>
<ul>
<li>Next.js App Router</li>
<li>Optimized for SEO using Next.js's Metadata</li>
<li>React Server Components (RSCs) and Suspense</li>
<li>Server Actions&nbsp;for mutations</li>
<li>Edge runtime</li>
<li>New Next.js 13 fetching and caching paradigms</li>
<li>Dynamic OG images</li>
<li>Styling with Tailwind CSS</li>
<li>Automatic light/dark mode based on system settings</li>
<li>And more!</li>
</ul></div>`,
  bodySummary: 'This website is built with Next.js, Vercel, and Salesforce Commerce Cloud.',
  seo: {
    title: 'About',
    description: 'This website is built with Next.js, Vercel, and Salesforce Commerce Cloud.'
  },
  createdAt: '2024-09-20T20:15:06Z',
  updatedAt: '2024-09-20T20:15:06Z'
};

const termsPage = {
  id: 'terms',
  title: 'Terms & Conditions',
  handle: 'terms-conditions',
  body: `<div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed faucibus turpis in eu mi bibendum. Consectetur libero id faucibus nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.</div>`,
  bodySummary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  seo: {
    title: 'Terms & Conditions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  },
  createdAt: '2024-09-20T20:15:06Z',
  updatedAt: '2024-09-20T20:15:06Z'
};

const shippingPage = {
  id: 'shipping',
  title: 'Shipping & Return Policy',
  handle: 'shipping-return-policy',
  body: `<div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed faucibus turpis in eu mi bibendum. Consectetur libero id faucibus nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.</div>`,
  bodySummary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  seo: {
    title: 'Shipping & Return Policy',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  },
  createdAt: '2024-09-20T20:15:06Z',
  updatedAt: '2024-09-20T20:15:06Z'
};

const privacyPage = {
  id: 'privacy',
  title: 'Privacy Policy',
  handle: 'privacy-policy',
  body: `<div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed faucibus turpis in eu mi bibendum. Consectetur libero id faucibus nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.</div>`,
  bodySummary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  seo: {
    title: 'Privacy Policy',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  },
  createdAt: '2024-09-20T20:15:06Z',
  updatedAt: '2024-09-20T20:15:06Z'
};

const faqPage = {
  id: 'faq',
  title: 'Frequently Asked Questions',
  handle: 'freqently-asked-questions',
  body: `<div className="prose mx-auto max-w-6xl text-base leading-7 text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam libero justo laoreet sit amet cursus sit. Dictumst quisque sagittis purus sit amet volutpat consequat. Egestas diam in arcu cursus euismod. Sed faucibus turpis in eu mi bibendum. Consectetur libero id faucibus nisl. Quisque id diam vel quam elementum. Eros donec ac odio tempor orci dapibus ultrices. Turpis tincidunt id aliquet risus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio.</div>`,
  bodySummary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  seo: {
    title: 'Frequently Asked Questions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
  },
  createdAt: '2024-09-20T20:15:06Z',
  updatedAt: '2024-09-20T20:15:06Z'
};

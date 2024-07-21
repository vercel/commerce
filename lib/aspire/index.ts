import { getProductById } from 'lib/shopify';
import { ContentLandingPages } from './types';

export async function getContentLandingPageConfig(contentLandingPageId: string) {
  const contentLandingPages: ContentLandingPages = {
    ABC: {
      contentLandingPageId: '01J39NYS5HKXE9J4R0BMDKH845',
      slug: 'ABC',
      content: {
        contentId: '01J39NY002BQ5FDH6BFJR78V8E',
        contentUrl: 'https://vercel.com'
      },
      brand: {
        brandId: '01J39NXQGAKT82JQWEYXP9MFE3',
        companyName: 'Vercel'
      },
      store: {
        storeId: '01J39NYCJY8ZW27ES9BB7KEVXN',
        domain: 'https://test-app-furie.myshopify.com',
        key: '30f0c9b2ee5c69d6c0de2e7a048eb6b4'
      },
      productId: 'gid://shopify/Product/8587441176812'
    },
    '123': {
      contentLandingPageId: '123',
      slug: '123',
      content: {
        contentId: '01J39P1K9DY9XM2B5Y9T5RVJNP',
        contentUrl: 'https://vercel.com'
      },
      brand: {
        brandId: '123456789',
        companyName: 'Vercel'
      },
      store: {
        storeId: 'quickstart-ba952e54',
        domain: 'https://quickstart-ba952e54.myshopify.com',
        key: '8efbd119747c632000b04ed68313abf1'
      },
      productId: 'gid://shopify/Product/7913032548543'
    }
  };

  const contentLandingPage = contentLandingPages[contentLandingPageId];

  if (!contentLandingPage) {
    throw new Error('Content Landing Page not found');
  }

  const product = await getProductById(contentLandingPage.store, contentLandingPage?.productId);

  return { ...contentLandingPage, product };
}

import { getProductById, getShop } from 'lib/shopify';
import { ContentLandingPages } from './types';

export async function getContentLandingPageConfig(
  contentLandingPageId: string,
  productId?: string,
  variantId?: string
) {
  const contentLandingPages: ContentLandingPages = {
    ABC: {
      contentLandingPageId: '01J39NYS5HKXE9J4R0BMDKH845',
      banner: 'Free ground shipping on orders over $250',
      slug: 'ABC',
      content: {
        contentId: '01J39NY002BQ5FDH6BFJR78V8E',
        contentUrl: '/snowboardLong.mp4'
      },
      store: {
        storeId: '01J39NYCJY8ZW27ES9BB7KEVXN',
        clientId: '',
        domain: 'https://test-app-furie.myshopify.com',
        key: '30f0c9b2ee5c69d6c0de2e7a048eb6b4'
      },
      productId: 'gid://shopify/Product/8587440783596',
      reviews: {
        rating: 4.4,
        reviewCount: 25,
        reviews: [
          {
            reviewId: '01J39P1K',
            title: 'Great product',
            description: 'I love this product',
            rating: 5
          }
        ]
      }
    },
    '123': {
      contentLandingPageId: '123',
      banner: 'Free ground shipping on orders over $300',
      slug: '123',
      content: {
        contentId: '01J39P1K9DY9XM2B5Y9T5RVJNP',
        contentUrl: '/snowboardLong.mp4'
      },
      store: {
        storeId: '01J39V34AN3RKG0X7MCSAGKECH',
        clientId: '',
        domain: 'https://quickstart-ba952e54.myshopify.com',
        key: '8efbd119747c632000b04ed68313abf1'
      },
      productId: 'gid://shopify/Product/7913032548543',
      reviews: {
        rating: 4.9,
        reviewCount: 235,
        reviews: [
          {
            reviewId: '01J39P1K',
            title: 'Great product',
            description: 'I love this product',
            rating: 5
          }
        ]
      }
    },
    ABD: {
      contentLandingPageId: '124',
      slug: '124',
      content: {
        contentId: '01J39NY002BQ5FDH6BFJR78V8E',
        contentUrl: '/snowboardLong.mp4'
      },
      store: {
        storeId: '01J39NYCJY8ZW27ES9BB7KEVXN',
        clientId: '',
        domain: 'https://test-app-furie.myshopify.com',
        key: '30f0c9b2ee5c69d6c0de2e7a048eb6b4'
      },
      productId: 'gid://shopify/Product/8587441111276',
      reviews: {
        rating: 0.0,
        reviewCount: 0,
        reviews: []
      }
    }
  };

  const contentLandingPage = contentLandingPages[contentLandingPageId];

  if (!contentLandingPage) {
    throw new Error('Content Landing Page not found');
  }

  const product = await getProductById(
    contentLandingPage.store,
    productId ? `gid://shopify/Product/${productId}` : contentLandingPage?.productId
  );

  const shop = await getShop(contentLandingPage.store);

  if (!shop) {
    throw new Error('Shop not found');
  }

  return { ...contentLandingPage, product, shop };
}

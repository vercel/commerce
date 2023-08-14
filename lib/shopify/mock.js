// Mock data for the defined types

const { adventureProducts } = require('./adventures');

export const mockShopifyProduct = adventureProducts[0];

// const mockShopifyProductOld = {
//   id: 'product1',
//   handle: 'sample-product',
//   availableForSale: true,
//   title: 'Sample Product',
//   description: 'This is a sample product.',
//   descriptionHtml: '<p>This is a sample product.</p>',
//   options: [mockProductOption],
//   priceRange: {
//     maxVariantPrice: mockMoney,
//     minVariantPrice: mockMoney
//   },
//   variants: { edges: [{ node: mockProductVariant }] },
//   featuredImage: mockImage,
//   images: { edges: [{ node: mockImage }] },
//   seo: {
//     title: 'Sample Product',
//     description: 'This is a sample product.'
//   },
//   tags: ['sample', 'product'],
//   updatedAt: '2023-08-10T00:00:00Z'
// };

export const mockCartItem = {
  id: 'item1',
  quantity: 1,
  cost: {
    totalAmount: {
      amount: '100.00',
      currencyCode: 'USD'
    }
  },
  merchandise: {
    id: 'merchandise1',
    title: 'WKND Adventure',
    selectedOptions: [
      {
        name: 'Duration',
        value: 'Normal'
      }
    ],
    product: mockShopifyProduct
  }
};

export const mockShopifyCart = {
  id: 'cart1',
  checkoutUrl: 'https://example.com/checkout',
  cost: {
    subtotalAmount: {
      amount: '90.00',
      currencyCode: 'USD'
    },
    totalAmount: {
      amount: '100.00',
      currencyCode: 'USD'
    },
    totalTaxAmount: {
      amount: '10.00',
      currencyCode: 'USD'
    }
  },
  lines: { edges: [{ node: mockCartItem }] },
  totalQuantity: 1
};

export const winterCollection = {
  handle: 'winter-collection',
  title: 'Winter',
  description: 'Adventures for the winter.',
  seo: {
    title: 'Winter Collection',
    description: 'Adventures for the winter.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

export const summerCollection = {
  handle: 'summer-collection',
  title: 'Summer',
  description: 'Adventures for the summer.',
  seo: {
    title: 'Summer Collection',
    description: 'Adventures for the summer.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

export const europeCollection = {
  handle: 'europe-collection',
  title: 'Europe',
  description: 'Adventures in Europe.',
  seo: {
    title: 'Europe Collection',
    description: 'Adventures in Europe.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

export const tcPage = {
  id: 'tc',
  title: 'Terms & Conditions',
  handle: 'tc',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary',
  seo: {
    title: 'Terms & Conditions Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const aboutPage = {
  id: 'about',
  title: 'About',
  handle: 'about',
  body: 'This website is built with Next.js Commerce, which is a ecommerce template for creating a headless storefront. ',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'About Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const faqPage = {
  id: 'faq',
  title: 'FAQ',
  handle: 'faq',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'About Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const ppPage = {
  id: 'pp',
  title: 'Privacy Policy',
  handle: 'pp',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'Privacy Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const srPage = {
  id: 'sr',
  title: 'Shipping & Return Policy',
  handle: 'sr',
  body: 'Shipping & Return Policy Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  bodySummary: 'Summary of about page',
  seo: {
    title: 'Privacy Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

export const pages = [tcPage, aboutPage, ppPage, faqPage, srPage];

export const collections = [winterCollection, summerCollection, europeCollection];

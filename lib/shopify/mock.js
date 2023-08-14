// Mock data for the defined types

const { adventureProducts } = require('./adventures');
export const mockMoney = {
  amount: '100.00',
  currencyCode: 'USD'
};

export const mockImage = {
  url: 'https://ssc-sparkle.vercel.app/_next/image?url=https%3A%2F%2Fpublish-p64257-e147834-cmstg.adobeaemcloud.com%2Fcontent%2Fdam%2Faem-demo-assets%2Fen%2Fadventures%2Fcycling-tuscany%2FAdobeStock_261097343.jpeg&w=2048&q=75',
  altText: 'Sample Image',
  width: 500,
  height: 500
};

export const mockProductOption = {
  id: 'option1',
  name: 'Color',
  values: ['Red', 'Blue', 'Green']
};

export const mockProductVariant = {
  id: 'variant1',
  title: 'Red Variant',
  availableForSale: true,
  selectedOptions: [
    {
      name: 'Color',
      value: 'Red'
    }
  ],
  price: mockMoney
};

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
  cost: { totalAmount: mockMoney },
  merchandise: {
    id: 'merchandise1',
    title: 'Sample Merchandise',
    selectedOptions: [
      {
        name: 'Color',
        value: 'Red'
      }
    ],
    product: mockShopifyProduct
  }
};

export const mockShopifyCart = {
  id: 'cart1',
  checkoutUrl: 'https://example.com/checkout',
  cost: {
    subtotalAmount: mockMoney,
    totalAmount: mockMoney,
    totalTaxAmount: mockMoney
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

export const mockPage = {
  id: 'page1',
  title: 'Sample Page',
  handle: 'sample-page',
  body: 'This is a sample page.',
  bodySummary: 'Sample summary.',
  seo: {
    title: 'Sample Page',
    description: 'This is a sample page.'
  },
  createdAt: '2023-08-01T00:00:00Z',
  updatedAt: '2023-08-10T00:00:00Z'
};

// Exporting the mock data

export const collections = [winterCollection, summerCollection, europeCollection];
//
// module.exports = {
//   mockMoney,
//   mockImage,
//   mockProductOption,
//   mockProductVariant,
//   mockShopifyProduct,
//   mockCartItem,
//   mockShopifyCart,
//   winterCollection: winterCollection,
//     summerCollection: summerCollection,
//     europeCollection: europeCollection,
//   mockPage
// };

// Mock data for the defined types

const mockMoney = {
  amount: '100.00',
  currencyCode: 'USD'
};

const mockImage = {
  url: 'https://example.com/image.jpg',
  altText: 'Sample Image',
  width: 500,
  height: 500
};

const mockProductOption = {
  id: 'option1',
  name: 'Color',
  values: ['Red', 'Blue', 'Green']
};

const mockProductVariant = {
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

const mockShopifyProduct = {
  id: 'product1',
  handle: 'sample-product',
  availableForSale: true,
  title: 'Sample Product',
  description: 'This is a sample product.',
  descriptionHtml: '<p>This is a sample product.</p>',
  options: [mockProductOption],
  priceRange: {
    maxVariantPrice: mockMoney,
    minVariantPrice: mockMoney
  },
  variants: { edges: [{ node: mockProductVariant }] },
  featuredImage: mockImage,
  images: { edges: [{ node: mockImage }] },
  seo: {
    title: 'Sample Product',
    description: 'This is a sample product.'
  },
  tags: ['sample', 'product'],
  updatedAt: '2023-08-10T00:00:00Z'
};

const mockCartItem = {
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

const mockShopifyCart = {
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

const mockShopifyCollection = {
  handle: 'sample-collection',
  title: 'Sample Collection',
  description: 'This is a sample collection.',
  seo: {
    title: 'Sample Collection',
    description: 'This is a sample collection.'
  },
  updatedAt: '2023-08-10T00:00:00Z'
};

const mockPage = {
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

module.exports = {
  mockMoney,
  mockImage,
  mockProductOption,
  mockProductVariant,
  mockShopifyProduct,
  mockCartItem,
  mockShopifyCart,
  mockShopifyCollection,
  mockPage
};

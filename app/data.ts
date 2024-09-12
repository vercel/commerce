import { Product } from 'lib/shopify/types';

//temp: for ProductGridItems test
export const mockProducts: Product[] = [
  {
    id: 'prod_001',
    handle: 'product-1',
    availableForSale: true,
    title: 'Product 1',
    description: 'This is the description for Product 1',
    descriptionHtml: '<p>This is the <strong>HTML</strong> description for Product 1</p>',
    options: [
      {
        id: 'option_001',
        name: 'Size',
        values: ['S', 'M', 'L']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '100.00',
        currencyCode: 'USD'
      },
      minVariantPrice: {
        amount: '80.00',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
      altText: 'Product 1 Featured Image',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Product 1 SEO Title',
      description: 'This is the SEO description for Product 1'
    },
    tags: ['tag1', 'tag2'],
    updatedAt: new Date().toISOString(),
    variants: [
      {
        id: 'variant_001',
        title: 'Variant 1',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Size',
            value: 'M'
          }
        ],
        price: {
          amount: '90.00',
          currencyCode: 'USD'
        }
      }
    ],
    images: [
      {
        url: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
        altText: 'Product 1 Image 1',
        width: 500,
        height: 500
      },
      {
        url: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
        altText: 'Product 1 Image 2',
        width: 400,
        height: 400
      }
    ]
  },
  {
    id: 'prod_002',
    handle: 'product-2',
    availableForSale: false,
    title: 'Product 2',
    description: 'This is the description for Product 2',
    descriptionHtml: '<p>This is the <strong>HTML</strong> description for Product 2</p>',
    options: [
      {
        id: 'option_002',
        name: 'Color',
        values: ['Red', 'Blue', 'Green']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '120.00',
        currencyCode: 'USD'
      },
      minVariantPrice: {
        amount: '100.00',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://cdn.shopify.com/static/sample-images/teapot.jpg',
      altText: 'Product 2 Featured Image',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Product 2 SEO Title',
      description: 'This is the SEO description for Product 2'
    },
    tags: ['tag3', 'tag4'],
    updatedAt: new Date().toISOString(),
    variants: [
      {
        id: 'variant_002',
        title: 'Variant 2',
        availableForSale: false,
        selectedOptions: [
          {
            name: 'Color',
            value: 'Red'
          }
        ],
        price: {
          amount: '110.00',
          currencyCode: 'USD'
        }
      }
    ],
    images: [
      {
        url: 'https://cdn.shopify.com/static/sample-images/teapot.jpg',
        altText: 'Product 2 Image 1',
        width: 500,
        height: 500
      }
    ]
  },
  {
    id: 'prod_003',
    handle: 'product-3',
    availableForSale: true,
    title: 'Product 3',
    description: 'This is the description for Product 3',
    descriptionHtml: '<p>This is the <strong>HTML</strong> description for Product 3</p>',
    options: [
      {
        id: 'option_003',
        name: 'Size',
        values: ['S', 'M', 'L']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '300.00',
        currencyCode: 'USD'
      },
      minVariantPrice: {
        amount: '80.00',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
      altText: 'Product 3 Featured Image',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Product 3 SEO Title',
      description: 'This is the SEO description for Product 3'
    },
    tags: ['tag3', 'tag2'],
    updatedAt: new Date().toISOString(),
    variants: [
      {
        id: 'variant_003',
        title: 'Variant 3',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Size',
            value: 'M'
          }
        ],
        price: {
          amount: '90.00',
          currencyCode: 'USD'
        }
      }
    ],
    images: [
      {
        url: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
        altText: 'Product 3 Image 1',
        width: 500,
        height: 500
      },
      {
        url: 'https://cdn.shopify.com/static/sample-images/bath.jpeg',
        altText: 'Product 3 Image 2',
        width: 400,
        height: 400
      }
    ]
  },
  {
    id: 'prod_004',
    handle: 'product-4',
    availableForSale: false,
    title: 'Product 4',
    description: 'This is the description for Product 4',
    descriptionHtml: '<p>This is the <strong>HTML</strong> description for Product 4</p>',
    options: [
      {
        id: 'option_004',
        name: 'Color',
        values: ['Red', 'Blue', 'Green']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '140.00',
        currencyCode: 'USD'
      },
      minVariantPrice: {
        amount: '100.00',
        currencyCode: 'USD'
      }
    },
    featuredImage: {
      url: 'https://cdn.shopify.com/static/sample-images/teapot.jpg',
      altText: 'Product 4 Featured Image',
      width: 500,
      height: 500
    },
    seo: {
      title: 'Product 4 SEO Title',
      description: 'This is the SEO description for Product 4'
    },
    tags: ['tag3', 'tag4'],
    updatedAt: new Date().toISOString(),
    variants: [
      {
        id: 'variant_004',
        title: 'Variant 4',
        availableForSale: false,
        selectedOptions: [
          {
            name: 'Color',
            value: 'Red'
          }
        ],
        price: {
          amount: '110.00',
          currencyCode: 'USD'
        }
      }
    ],
    images: [
      {
        url: 'https://cdn.shopify.com/static/sample-images/teapot.jpg',
        altText: 'Product 4 Image 1',
        width: 500,
        height: 500
      }
    ]
  }
];

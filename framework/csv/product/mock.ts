import { Product } from '@commerce/types'

export default {
  get full(): Product {
    return {
      id: 'some-product',
      name: 'Some product',
      description: 'Some description',
      descriptionHtml: `<p>Some HTML description</p>`,
      slug: 'some-product',
      path: '/product',
      images: [
        {
          url: 'https://picsum.photos/640/480',
          alt: 'placeholder',
        },
        {
          url: 'https://picsum.photos/640/480',
          alt: 'placeholder',
        },
      ],
      variants: [
        {
          id: 'variant-1',
          options: [
            {
              id: 'product-1',
              displayName: 'Product',
              values: [
                {
                  label: 'Product color 1',
                  hexColors: ['#333', '#121'],
                },
              ],
            },
          ],
        },
      ],
      price: {
        currencyCode: 'ARS',
        value: 100,
      },
      options: [
        {
          id: 'option-1',
          displayName: 'Option 1',
          values: [
            {
              label: 'Product color 1',
              hexColors: ['#333', '#121'],
            },
          ],
        },
        {
          id: 'option-2',
          displayName: 'Option 2',
          values: [
            {
              label: 'Product color 2',
              hexColors: ['#FF0000'],
            },
          ],
        },
      ],
      sku: 'sku-product',
    }
  },
}

import type { Provider } from '..'
import type { Product } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'

export default function getAllProductsOperation({}: OperationContext<Provider>) {
  async function getAllProducts(): Promise<{ products: Product[] }> {
    const product = {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzU0NDczMjUwMjQ0MjA=',
      name: 'New Short Sleeve T-Shirt',
      description: '',
      vendor: 'Next.js',
      path: '/new-short-sleeve-t-shirt',
      slug: 'new-short-sleeve-t-shirt',
      price: { value: 25, currencyCode: 'USD' },
      images: [
        {
          url: '/assets/t-shirt-0.png',
          altText: null,
          width: 1000,
          height: 1000,
        },
      ],
      variants: [],
      options: [],
    }

    return {
      products: [product],
    }
  }

  return getAllProducts
}

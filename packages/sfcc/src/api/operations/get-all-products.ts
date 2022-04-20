import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { SFCCConfig } from '../index'
import { normalizeSearchProducts } from '../utils/normalise-product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<SFCCConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    // TODO: support locale
    const { sdk, locale } = commerce.getConfig(config) as SFCCConfig
    const searchClient = await sdk.getSearchClient()

    // use SDK search API for initial products
    const searchResults = await searchClient.productSearch({
      parameters: { q: 'dress', limit: variables?.first },
    })

    let products = [] as Product[]

    if (searchResults.total) {
      products = normalizeSearchProducts(searchResults.hits)
    }

    return {
      products: products,
    }
  }
  return getAllProducts
}

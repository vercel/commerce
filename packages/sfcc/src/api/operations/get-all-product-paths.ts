import { Product } from '@vercel/commerce/types/product'
import { OperationContext } from '@vercel/commerce/api/operations'
import { normalizeSearchProducts } from '../utils/normalise-product'
import { SFCCConfig } from '..'

export type GetAllProductPathsResult = {
  products: Array<{ path: string }>
}

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProductPaths({
    query,
    config,
    variables,
  }: {
    query?: string
    config?: SFCCConfig
    variables?: any
  } = {}): Promise<GetAllProductPathsResult> {
    // TODO: support locale
    const { sdk, locale } = commerce.getConfig(config) as SFCCConfig
    const searchClient = await sdk.getSearchClient()

    // use SDK search API for initial products same as getAllProductsOperation
    const searchResults = await searchClient.productSearch({
      parameters: { q: 'dress', limit: variables?.first },
    })

    let products = [] as Product[]

    if (searchResults.total) {
      products = normalizeSearchProducts(searchResults.hits)
    }

    return {
      products: products?.map(({ slug }: Product) => ({
        path: `/${slug}`,
      })),
    }
  }

  return getAllProductPaths
}

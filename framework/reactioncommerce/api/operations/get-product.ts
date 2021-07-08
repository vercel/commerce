import { Product } from '@commerce/types/product'
import { OperationContext } from '@commerce/api/operations'
import { normalizeProduct } from '@framework/utils'
import { Provider, ReactionCommerceConfig } from '../'
import { CatalogItem } from '../../schema'
import getProductQuery from '../../utils/queries/get-product-query'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct({
    query = getProductQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: { slug: string }
    config?: Partial<ReactionCommerceConfig>
    preview?: boolean
  }): Promise<Product | {} | any> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch<CatalogItem>(query, { variables })

    const { catalogItemProduct } = data

    if (catalogItemProduct) {
      return { product: normalizeProduct(catalogItemProduct) }
    }
  }

  return getProduct
}

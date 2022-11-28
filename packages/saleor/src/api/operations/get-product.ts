import type { OperationContext } from '@vercel/commerce/api/operations'
import type { GetProductOperation } from '@vercel/commerce/types/product'
import type { Provider, SaleorConfig } from '..'

import { normalizeProduct } from '../../utils'

import * as Query from '../../utils/queries'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    query = Query.ProductOneBySlug,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<SaleorConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(cfg)

    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          'Accept-Language': locale,
        }),
      }
    )

    return data && data.product
      ? { product: normalizeProduct(data.product) }
      : {}
  }

  return getProduct
}

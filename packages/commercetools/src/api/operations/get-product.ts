import { normalizeProduct } from '../../utils'
import { GetProductOperation } from '@vercel/commerce/types/product'
import { OperationContext } from '@vercel/commerce/api/operations'
import { CommercetoolsConfig, Provider } from '..'
import {
  ProductPagedQueryResponse,
  ClientResponse,
} from '@commercetools/platform-sdk'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    variables,
    config: cfg,
  }: {
    variables: { slug: string }
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const config = commerce.getConfig(cfg)
    const product = await config.sdkFetch<
      ClientResponse<ProductPagedQueryResponse>
    >({
      query: 'products',
      method: 'get',
      variables: {
        where: `masterData(current(slug(en-US="${variables.slug}")))`,
      },
    })
    const data =
      product.body.count > 0
        ? normalizeProduct(
            {
              ...product.body.results[0].masterData.current,
              id: product.body.results[0].id,
            },
            config
          )
        : undefined
    return {
      product: data,
    }
  }

  return getProduct
}

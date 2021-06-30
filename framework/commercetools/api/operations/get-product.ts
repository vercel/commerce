import { Product } from '@commerce/types/product'
import { OperationContext } from '@commerce/api/operations'
import { Provider, CommercetoolsConfig } from '@framework/api'
import { normalizeProduct } from '@framework/lib/normalize'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct({
    variables,
    config: cfg,
  }: {
    variables: {
      slug?: string
      id?: string
      locale?: string
    }
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  }): Promise<Product | {} | any> {
    const config = commerce.getConfig(cfg)

    // TODO: TEC-264: Handle the locale properly
    const queryArg = {
      where: `slug(en="${variables.slug}")`,
    }
    const projection = await config.fetchProducts(queryArg)
    const product = projection.body.results[0]

    if (product) {
      return { product: normalizeProduct(product) }
    }

    return {}
  }

  return getProduct
}

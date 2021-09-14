import { Product } from '@commerce/types/product'
import { GetProductOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import { Product as MedusaProduct } from '@medusajs/medusa-js/lib/types'
import { normalizeProduct } from '@framework/utils/normalizers/normalize-products'
import { MedusaConfig } from '..'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const config = commerce.getConfig(cfg)

    const response = await config.fetch('products', 'list', {})

    if (response.data?.products) {
      const products: MedusaProduct[] = response.data.products
      const product = products
        ? products.find(({ handle }) => handle === variables!.slug)
        : null

      /**
       * Commerce only provides us with the slug/path for finding
       * the specified product. We do not have a endpoint for retrieving
       * products using handles. Perhaps we should ask Vercel if we can
       * change this so the variables also expose the product_id, which
       * we can use for retrieving products.
       */
      if (product) {
        return {
          product: normalizeProduct(product),
        }
      }
    }
  }

  return getProduct
}

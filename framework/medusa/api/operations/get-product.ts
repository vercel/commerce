import type { OperationContext } from '@commerce/api/operations'
import type { GetProductOperation } from '@commerce/types/product'

import type { MedusaConfig, Provider } from '../index'

import { normalizeProduct } from '../../utils/normalizers/normalize-products'
import { MedusaProduct } from '../../types'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    config,
    variables,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { restFetch } = commerce.getConfig(config)

    // const rawProducts: Promise<MedusaProduct[]> = restFetch<{
    //   products: MedusaProduct[]
    // }>('GET', '/store/products').then((response) => response.products)

    // const [products] = await Promise.all([rawProducts])

    // const product = products.find(({ handle }) => handle === variables!.slug)

    return {
      product: undefined,
    }

    // // Get fetch from the config
    // const { restFetch } = commerce.getConfig(config)

    // // Get a single product
    // const productPromise = restFetch<RawProduct>(
    //   'GET',
    //   `/me/products/${variables?.slug}`
    // )

    // // Get product specs
    // const specsPromise = restBuyerFetch<{ Items: RawSpec[] }>(
    //   'GET',
    //   `/me/products/${variables?.slug}/specs`
    // ).then((res) => res.Items)

    // // Get product variants
    // const variantsPromise = restBuyerFetch<{ Items: RawVariant[] }>(
    //   'GET',
    //   `/me/products/${variables?.slug}/variants`
    // ).then((res) => res.Items)

    // // Execute all promises in parallel
    // const [product, specs, variants] = await Promise.all([
    //   productPromise,
    //   specsPromise,
    //   variantsPromise,
    // ])

    // // Hydrate product
    // product.xp.Specs = specs
    // product.xp.Variants = variants

    // return {
    //   // Normalize product to commerce schema
    //   product: normalizeProduct(product),
    // }
  }

  return getProduct
}

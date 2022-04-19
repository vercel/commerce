import { GetProductOperation, Product } from '@vercel/commerce/types/product'
import type { SFCCConfig } from '../index'
import type { OperationContext } from '@vercel/commerce/api/operations'
import { normalizeProduct } from '../utils/normalise-product'

export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<SFCCConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    // TODO: support locale
    const { sdk, locale } = commerce.getConfig(config) as SFCCConfig
    const shopperProductsClient = await sdk.getshopperProductsClient()
    const product = await shopperProductsClient.getProduct({
      parameters: { id: variables?.slug as string },
    })
    const normalizedProduct = normalizeProduct(product)

    return {
      product: normalizedProduct,
    }
  }

  return getProduct
}

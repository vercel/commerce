import { Product } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Provider, SyliusConfig } from '../index'
import { SyliusProduct } from '../../types/products'
import { normalizeProduct } from '../../utils/normalize/normalize-product'
import { PRODUCTS_ENDPOINT } from '../../utils/constant/api-endpoints'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts(opts?: {
    variables?: any
    config?: Partial<SyliusConfig>
    preview?: boolean
  }): Promise<{ products: Product[] }>

  async function getAllProducts({
    config: cfg,
    variables = { first: 250 },
  }: {
    query?: string
    variables?: any
    config?: Partial<SyliusConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] }> {
    const config = commerce.getConfig(cfg)
    const syliusProducts = await config.fetch('GET', PRODUCTS_ENDPOINT)
    const products = syliusProducts.map((syliusProduct: SyliusProduct) =>
      normalizeProduct(syliusProduct)
    )
    return {
      products,
    }
  }

  return getAllProducts
}

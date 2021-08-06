import { Product } from '@commerce/types/product'
import { GetAllProductsOperation } from '@commerce/types/product'
import type { OperationContext } from '@commerce/api/operations'
import type { OrdercloudConfig, Provider } from '../index'
import {
  PriceSchedule,
  RawProduct,
  RawProductWithPrice,
} from '@framework/types/product'
import { normalize as normalizeProduct } from '@framework/utils/product'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<OrdercloudConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] }> {
    const { fetch } = commerce.getConfig(config)

    const rawProducts: RawProduct[] = await fetch<{ Items: RawProduct[] }>(
      'GET',
      '/products'
    ).then((response) => response.Items)
    const rawProductsWithPrice: RawProductWithPrice[] = await Promise.all(
      rawProducts.map(async (product) => ({
        ...product,
        priceSchedule: await fetch<PriceSchedule>(
          'GET',
          `/priceschedules/${product.ID}`
        ),
      }))
    )

    return {
      products: rawProductsWithPrice.map(normalizeProduct),
    }
  }
  return getAllProducts
}

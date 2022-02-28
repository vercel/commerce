import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { CommercelayerConfig } from '../index'
import data from '../../data.json'
import { Price } from '@commercelayer/js-sdk'
import { getSalesChannelToken } from '@commercelayer/js-auth'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<CommercelayerConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const endpoint = process.env.NEXT_PUBLIC_COMMERCELAYER_ENDPOINT as string
    const credentials = await getSalesChannelToken({
      endpoint,
      clientId: process.env.NEXT_PUBLIC_COMMERCELAYER_CLIENT_ID as string,
      scope: process.env.NEXT_PUBLIC_COMMERCELAYER_MARKET_SCOPE as string,
    })
    if (credentials?.accessToken) {
      const skus: string[] = []
      const config = {
        accessToken: credentials.accessToken,
        endpoint,
      }
      data.products.map(({ variants }) => skus.push(variants[0].options[0].id))
      const prices = (
        await Price.withCredentials(config)
          .where({ skuCodeIn: skus.join(',') })
          .all({ rawResponse: true })
      ).data
      data.products.map((product) => {
        prices.map((price) => {
          const skuCode = price.attributes.sku_code
          if (skuCode.startsWith(product.id)) {
            product.price.value = price.attributes.amount_float
            product.price.currencyCode = price.attributes.currency_code
          }
        })
        return product
      })
    }
    return {
      products: data.products,
    }
  }
  return getAllProducts
}

import { Price, CommerceLayerClient } from '@commercelayer/sdk'
import { Product } from '@vercel/commerce/types/product'
import type { Products } from './getContentData'

type GetPricesArgs = {
  products?: Products
  sdk: CommerceLayerClient
}

export default async function getPrices({ products = [], sdk }: GetPricesArgs) {
  let allPrices: Price[] = []
  const skus: string[] = []
  if (products) {
    products.forEach(async ({ variants }) => {
      if (variants && variants[0]?.options) {
        variants[0]?.options[0]?.id && skus.push(variants[0]?.options[0]?.id)
      }
    })
    const prices = await sdk.prices.list({
      filters: { sku_code_in: skus.join(',') },
    })
    allPrices = [...prices]
    for (
      let pageNumber = prices.meta.currentPage;
      pageNumber < prices.meta.pageCount;
      pageNumber++
    ) {
      const pricesPage = await sdk.prices.list({
        filters: { sku_code_in: skus.join(',') },
        pageNumber,
      })
      allPrices = [...allPrices, ...pricesPage]
    }
    products.forEach((product, i) => {
      for (const price of allPrices) {
        const skuCode = price.sku_code
        if (skuCode && product?.id && skuCode.startsWith(product.id)) {
          product.price = {
            value: price.amount_float as number,
            currencyCode: price.currency_code,
          }
          break
        }
        product.price = {
          value: 0,
          currencyCode: 'USD',
        }
      }
      if (products && products[i]) {
        products[i] = product
      }
    })
  }
  return products as Product[]
}

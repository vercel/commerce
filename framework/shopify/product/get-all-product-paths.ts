import Client from 'shopify-buy'
import { getConfig } from '../api'
import { Product } from '../types'
import toCommerceProducts from '../utils/to-commerce-products'

type ReturnType = {
  products: any[]
}

const getAllProductPaths = async (): Promise<ReturnType> => {
  const config = getConfig()

  const client = Client.buildClient({
    storefrontAccessToken: config.apiToken,
    domain: config.commerceUrl,
  })

  const res = (await client.product.fetchAll()) as Product[]

  const products = toCommerceProducts(res)

  return {
    products: products.map((product) => {
      return {
        node: { ...product },
      }
    }),
  }
}

export default getAllProductPaths

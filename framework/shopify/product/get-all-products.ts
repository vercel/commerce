import Client from 'shopify-buy'
import { ShopifyConfig } from '../api'
import { Product } from '../types'
import toCommerceProducts from '../utils/to-commerce-products'

export type ProductNode = Product

type Variables = {
  first?: number
  field?: string
}

type Options = {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}

type ReturnType = {
  products: any[]
}

const getAllProducts = async (options: Options): Promise<ReturnType> => {
  const { config } = options

  const client = Client.buildClient({
    storefrontAccessToken: config.apiToken,
    domain: config.commerceUrl,
  })

  const res = (await client.product.fetchAll()) as Product[]

  const products = toCommerceProducts(res)

  return {
    products,
  }
}

export default getAllProducts

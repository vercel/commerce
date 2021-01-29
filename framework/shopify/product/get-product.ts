import Client from 'shopify-buy'
import { ShopifyConfig } from '../api'
import { Product } from '../types'
import toCommerceProducts from '../utils/to-commerce-products'

export type ProductNode = Product

type Variables = {
  slug: string
}

type Options = {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}

type ReturnType = {
  product: any
}

const getProduct = async (options: Options): Promise<ReturnType> => {
  const { variables, config } = options

  const client = Client.buildClient({
    storefrontAccessToken: config.apiToken,
    domain: config.commerceUrl,
  })

  const res = (await client.product.fetchByHandle(variables.slug)) as Product

  return {
    product: toCommerceProducts([res])[0],
  }
}

export default getProduct

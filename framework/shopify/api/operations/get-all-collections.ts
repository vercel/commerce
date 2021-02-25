import Client from 'shopify-buy'
import { ShopifyConfig } from '../index'

type Options = {
  config: ShopifyConfig
}

const getAllCollections = async (options: Options) => {
  const { config } = options

  const client = Client.buildClient({
    storefrontAccessToken: config.apiToken,
    domain: config.commerceUrl,
  })

  const res = await client.collection.fetchAllWithProducts()

  return JSON.parse(JSON.stringify(res))
}

export default getAllCollections

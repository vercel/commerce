import { Product, Search } from 'commerce-sdk'
import { getConfigAuth } from './get-auth-token'

const getSearchClient = async () => {
  const configAuth = await getConfigAuth()
  return new Search.ShopperSearch(configAuth)
}

const getshopperProductsClient = async () => {
  const configAuth = await getConfigAuth()
  return new Product.ShopperProducts(configAuth)
}

export const sdk = {
  getshopperProductsClient,
  getSearchClient,
}
export type Sdk = typeof sdk
export default sdk

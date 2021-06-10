import type { APIProvider, CommerceAPIConfig } from '@commerce/api'
import { CommerceAPI, getCommerceApi as commerceApi } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface LocalConfig extends CommerceAPIConfig {}

const ONE_DAY = 60 * 60 * 24
const config: LocalConfig = {
  commerceUrl: '',
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
}

const operations = {
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider
export type LocalAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): LocalAPI<P> {
  return commerceApi(customProvider)
}

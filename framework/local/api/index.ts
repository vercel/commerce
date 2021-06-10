import type { CommerceAPIConfig } from '@commerce/api'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import { CommerceAPI, getCommerceApi as commerceApi } from '@commerce/api'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface VendureConfig extends CommerceAPIConfig {}

const ONE_DAY = 60 * 60 * 24
const config: VendureConfig = {
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
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): CommerceAPI<P> {
  return commerceApi(customProvider)
}

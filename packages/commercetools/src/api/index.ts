import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@vercel/commerce/api'
import {
  COMMERCETOOLS_CART_COOKIE,
  COMMERCETOOLS_COOKIE_EXPIRE,
  COMMERCETOOLS_WISHLIST_COOKIE,
} from '../const'

import fetcher from '../fetcher'
import login from './operations/login'
import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'
import { FetcherOptions } from '@vercel/commerce/utils/types'

export interface CommercetoolsConfig extends CommerceAPIConfig {
  fetcher: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
  wishlistCookie: string
  sdkFetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>
}

const config: CommercetoolsConfig = {
  locale: 'en-US',
  commerceUrl: '',
  apiToken: '',
  cartCookie: COMMERCETOOLS_CART_COOKIE,
  cartCookieMaxAge: COMMERCETOOLS_COOKIE_EXPIRE,
  wishlistCookie: COMMERCETOOLS_WISHLIST_COOKIE,
  fetch: {} as any,
  fetcher,
  sdkFetch: fetcher,
  customerCookie: '',
}

const operations = {
  login,
  getAllPages,
  getPage,
  getSiteInfo,
  getAllProductPaths,
  getAllProducts,
  getProduct,
}

export const provider = { config, operations }

export type Provider = typeof provider

export type CommercetoolsAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): CommercetoolsAPI<P> {
  return commerceApi(customProvider)
}

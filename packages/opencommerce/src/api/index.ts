import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@vercel/commerce/api'
import createFetchGraphqlApi from './utils/fetch-grapql-api'

const API_URL = process.env.OPENCOMMERCE_STOREFRONT_API_URL

if (!API_URL) {
  throw new Error(
    `The environment variable OPENCOMMERCE_STOREFRONT_API_URL is missing and it's required to access your store`
  )
}

export interface OpenCommerceConfig extends CommerceAPIConfig {}

const ONE_DAY = 60 * 60 * 24

const config: OpenCommerceConfig = {
  commerceUrl: `${API_URL}/graphql`,
  apiToken: '',
  customerCookie: 'opencommerce_customerToken',
  cartCookie: 'opencommerce_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: createFetchGraphqlApi(() => getCommerceApi().getConfig()),
}

const operations = {}
export const provider = { config, operations }

export type Provider = typeof provider

export type OpenCommerceAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): OpenCommerceAPI<P> {
  return commerceApi(customProvider)
}

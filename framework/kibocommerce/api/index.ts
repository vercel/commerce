import type { CommerceAPI, CommerceAPIConfig } from '@commerce/api'
import { getCommerceApi as commerceApi } from '@commerce/api'
import createFetcher from './utils/fetch-local'

import getAllPages from './operations/get-all-pages'
import getPage from './operations/get-page'
import getSiteInfo from './operations/get-site-info'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getProduct from './operations/get-product'

export interface KiboCommerceConfig extends CommerceAPIConfig {}
const config: KiboCommerceConfig = {
  commerceUrl: process.env.KIBO_API_URL || 'https://t17194-s21127.dev10.kubedev.kibo-dev.com/graphql',
  apiToken: process.env.KIBO_API_TOKEN || `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tL2FwcF9jbGFpbXMiOnsic3NsIjoiMCIsImVudCI6IjEiLCJtdHIiOiIxIiwidWMiOiIwIiwicm5kIjoxNDQ1NjE5MDQ0LCJhaWQiOiJraWJvLWRldmVsb3Blci1rZXkiLCJha2V5Ijoia2liby1kZXZlbG9wZXIta2V5IiwiYnYiOlswLC0xNTc3NzkyMiwxLDIwNzkwNjQwNjMsMiwyMTQ3NDgzNTgyLDMsLTk3LDQsODE5MSw1LC0xNzE1Myw2LC0xMzQyMTc3MjksNywtMSw4LDQxOTQzMDMsMzEsODM4ODM1Ml0sImV4cCI6IjIwMjYtMDQtMjlUMTg6NDA6MDQiLCJlbnYiOiJkZXYxMCJ9LCJuYmYiOjE2MTk3MjE2MDUsImV4cCI6MTc3NzQ4ODAwNCwiaWF0IjoxNjE5NzIxNjA1LCJpc3MiOiJodHRwczovL3d3dy5raWJvY29tbWVyY2UuY29tIiwiYXVkIjoiaHR0cHM6Ly93d3cua2lib2NvbW1lcmNlLmNvbSJ9.xn2i0-1bmH65x_z51UQVRDY8fwn4NXnnD5JtIhcrUkw`,
  cartCookie: process.env.KIBO_CART_COOKIE || 'kibo_car',
  customerCookie: process.env.KIBO_CUSTOMER_COOKIE || 'kibo_customer',
  cartCookieMaxAge: 2592000,
  fetch: createFetcher(() => getCommerceApi().getConfig()),
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

export type KiboCommerceProvider = typeof provider
export type KiboCommerceAPI<
  P extends KiboCommerceProvider = KiboCommerceProvider
> = CommerceAPI<P | any>

export function getCommerceApi<P extends KiboCommerceProvider>(
  customProvider: P = provider as any
): KiboCommerceAPI<P> {
  return commerceApi(customProvider as any)
}

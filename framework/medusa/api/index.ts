import type { CommerceAPIConfig } from '@commerce/api'
import { CommerceAPI, getCommerceApi as commerceApi } from '@commerce/api'
import fetchApi from './utils/fetch-medusa-api'
import { MEDUSA_CART_ID_COOKIE } from '../const'

import * as operations from './operations'

export interface MedusaConfig extends CommerceAPIConfig {
  fetch: any
}

const config: MedusaConfig = {
  commerceUrl: '',
  apiToken: '',
  cartCookie: MEDUSA_CART_ID_COOKIE,
  customerCookie: '',
  cartCookieMaxAge: 60 * 60 * 24 * 30,
  fetch: fetchApi,
}

export const provider = { config, operations }

export type Provider = typeof provider
export type MedusaAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): MedusaAPI<P> {
  return commerceApi(customProvider as any)
}

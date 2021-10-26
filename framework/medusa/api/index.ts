import type { CommerceAPIConfig } from '@commerce/api'
import { CommerceAPI, getCommerceApi as commerceApi } from '@commerce/api'
import fetchApi, { createFetcher } from './utils/fetch-rest'
import { MEDUSA_CART_ID_COOKIE, MEDUSA_PUBLIC_STORE_URL } from '../const'

import * as operations from './operations'

export interface MedusaConfig extends CommerceAPIConfig {
  fetch: any
  restFetch: <T>(
    method: string,
    resource: string,
    body?: Record<string, unknown>,
    fetchOptions?: Record<string, any>
  ) => Promise<T>
}

const config: MedusaConfig = {
  commerceUrl: MEDUSA_PUBLIC_STORE_URL!,
  apiToken: '',
  cartCookie: MEDUSA_CART_ID_COOKIE,
  customerCookie: '',
  cartCookieMaxAge: 60 * 60 * 24 * 30,
  fetch: createFetcher(() => getCommerceApi().getConfig()),
  restFetch: createFetcher(() => getCommerceApi().getConfig()),
}

export const provider = { config, operations }

export type Provider = typeof provider
export type MedusaAPI<P extends Provider = Provider> = CommerceAPI<P | any>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): MedusaAPI<P> {
  return commerceApi(customProvider as any)
}

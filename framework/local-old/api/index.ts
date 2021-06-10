import {
  CommerceAPI,
  CommerceAPIConfig,
  getCommerceApi as commerceApi,
} from '@commerce/api'

export interface LocalConfig extends CommerceAPIConfig {}
import * as operations from './operations'
import fetchGraphqlApi from './utils/fetch-graphql-api'

const config: LocalConfig = {
  commerceUrl: '',
  apiToken: '',
  customerCookie: '',
  cartCookie: '',
  cartCookieMaxAge: 16000000,
  fetch: fetchGraphqlApi,
}

export const provider = {
  config,
  operations,
}

export type Provider = typeof provider
export type LocalAPI<P extends Provider = Provider> = CommerceAPI<P>

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): LocalAPI<P> {
  return commerceApi(customProvider)
}

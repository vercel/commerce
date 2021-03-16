import type { RequestInit, Response } from '@vercel/fetch'
import type { APIEndpoint, APIHandler } from './utils/types'

export type CartHandlers<Body extends { cartId: 'string' }> = {
  getCart: APIHandler<any, CartHandlers<Body>, any, Body>
  addItem: APIHandler<any, CartHandlers<Body>, any, Body>
  updateItem: APIHandler<any, CartHandlers<Body>, any, Body>
  removeItem: APIHandler<any, CartHandlers<Body>, any, Body>
}

export type CoreAPIProvider = {
  config: CommerceAPIConfig
  endpoints?: {
    cart?: {
      handler: APIEndpoint<any, any, CartHandlers<any>, any>
      handlers: CartHandlers<any>
    }
  }
}

export type APIProvider<P extends CoreAPIProvider = CoreAPIProvider> = P & {
  getConfig(userConfig?: Partial<P['config']>): P['config']
  setConfig(newConfig: Partial<P['config']>): void
}

export class CommerceAPI<P extends CoreAPIProvider = CoreAPIProvider> {
  constructor(readonly provider: P) {
    this.provider = provider
  }

  getConfig(userConfig: Partial<P['config']> = {}) {
    return Object.entries(userConfig).reduce(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.provider.config }
    )
  }

  setConfig(newConfig: Partial<P['config']>) {
    Object.assign(this.provider.config, newConfig)
  }
}

export function createAPIProvider<P extends CoreAPIProvider>(
  provider: P
): APIProvider<P> {
  return {
    ...provider,
    getConfig(userConfig = {}) {
      return Object.entries(userConfig).reduce(
        (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
        { ...this.config }
      )
    },
    setConfig(newConfig) {
      Object.assign(this.config, newConfig)
    },
  }
}

export interface CommerceAPIConfig {
  locale?: string
  commerceUrl: string
  apiToken: string
  cartCookie: string
  cartCookieMaxAge: number
  customerCookie: string
  fetch<Data = any, Variables = any>(
    query: string,
    queryData?: CommerceAPIFetchOptions<Variables>,
    fetchOptions?: RequestInit
  ): Promise<GraphQLFetcherResult<Data>>
}

export type GraphQLFetcher<
  Data extends GraphQLFetcherResult = GraphQLFetcherResult,
  Variables = any
> = (
  query: string,
  queryData?: CommerceAPIFetchOptions<Variables>,
  fetchOptions?: RequestInit
) => Promise<Data>

export interface GraphQLFetcherResult<Data = any> {
  data: Data
  res: Response
}

export interface CommerceAPIFetchOptions<Variables> {
  variables?: Variables
  preview?: boolean
}

import type { NextApiHandler } from 'next'
import type { RequestInit, Response } from '@vercel/fetch'
import type { APIEndpoint, APIHandler } from './utils/types'

export type CartEndpoint = APIEndpoint<any, any, CartHandlers<any>, any>

export type CartHandlers<Body extends { cartId: 'string' }> = {
  getCart: APIHandler<any, CartHandlers<Body>, any, Body>
  addItem: APIHandler<any, CartHandlers<Body>, any, Body>
  updateItem: APIHandler<any, CartHandlers<Body>, any, Body>
  removeItem: APIHandler<any, CartHandlers<Body>, any, Body>
}

export type Endpoints = CartEndpoint

export type EndpointHandlers<E> = E extends APIEndpoint<any, any, infer T>
  ? T
  : never

export type EndpointOptions<E> = E extends APIEndpoint<any, any, any, infer T>
  ? T
  : never

export type CoreAPIProvider = {
  config: CommerceAPIConfig
}

export type APIProvider<P extends CoreAPIProvider = CoreAPIProvider> = P & {
  getConfig(userConfig?: Partial<P['config']>): P['config']
  setConfig(newConfig: Partial<P['config']>): void
}

export class CommerceAPI<
  P extends CoreAPIProvider = CoreAPIProvider,
  E extends Endpoints = Endpoints
> {
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

  endpoint(context: {
    handler: E
    config?: P['config']
    operations: EndpointHandlers<typeof context.handler>
    options?: EndpointOptions<typeof context.handler>
  }): NextApiHandler {
    const provider = this
    const cfg = this.getConfig(context.config)

    return function apiHandler(req, res) {
      return context.handler({
        req,
        res,
        provider,
        config: cfg,
        handlers: context.operations,
        options: context.options,
      })
    }
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

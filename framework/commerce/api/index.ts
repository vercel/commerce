import type { NextApiHandler } from 'next'
import type { RequestInit, Response } from '@vercel/fetch'
import type { APIEndpoint, APIHandler } from './utils/types'
import type { Cart } from '../types'

export type CartEndpoint = APIEndpoint<any, any, CartHandlers<CommerceAPI>, any>

export type CartHandlersBase<C> = {
  getCart: APIHandler<any, CartHandlersBase<C>, Cart | null, any>
  addItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
  updateItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
  removeItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
}

export type CartHandlers<
  C extends CommerceAPI,
  T extends CartHandlersBase<C> = CartHandlersBase<C>
> = T

export type Endpoints = CartEndpoint

export type EndpointHandlers<E> = E extends APIEndpoint<any, any, infer T>
  ? T
  : never

export type EndpointOptions<E> = E extends APIEndpoint<any, any, any, infer T>
  ? T
  : never

export type APIProvider = {
  config: CommerceAPIConfig
}

export class CommerceAPI<
  P extends APIProvider = APIProvider,
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
    const commerce = this
    const cfg = this.getConfig(context.config)

    return function apiHandler(req, res) {
      return context.handler({
        req,
        res,
        commerce,
        config: cfg,
        handlers: context.operations,
        options: context.options,
      })
    }
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

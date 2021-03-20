import type { NextApiHandler } from 'next'
import type { RequestInit, Response } from '@vercel/fetch'
import type { APIEndpoint, APIHandler } from './utils/types'
import type { Cart } from '../types'

export type CartEndpoint = APIEndpoint<any, any, CartHandlers<CommerceAPI>, any>

export type CartHandlersBase<C extends CommerceAPI> = {
  getCart: APIHandler<
    any,
    CartHandlersBase<C>,
    Cart | null,
    any,
    { yay: string }
  >
  addItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
  updateItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
  removeItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
}

export type CartHandlers<
  C extends CommerceAPI,
  T extends CartHandlersBase<C> = CartHandlersBase<C>
> = T

export type CartHandlersType = {
  getCart: { data: Cart | null; body: any; options: {} }
  addItem: { data: Cart; body: any; options: {} }
  updateItem: { data: Cart; body: any; options: {} }
  removeItem: { data: Cart; body: any; options: {} }
}

export type CartHandlers2<
  C extends CommerceAPI,
  T extends CartHandlersType = CartHandlersType
> = {
  getCart: APIHandler<
    any,
    CartHandlersBase<C>,
    Cart | null,
    any,
    { yay: string }
  >
  addItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
  updateItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
  removeItem: APIHandler<any, CartHandlersBase<C>, Cart, any>
}

export type EndpointsSchema = {
  cart?: {
    options: {}
    operations: {
      getCart: { data?: Cart | null; body?: any }
      addItem: { data?: Cart; body?: any }
      updateItem: { data?: Cart; body?: any }
      removeItem: { data?: Cart; body?: any }
    }
  }
}

export type GetEndpointsSchema<
  C extends CommerceAPI,
  Schema extends EndpointsSchema = C extends CommerceAPI<any, infer E>
    ? E
    : never
> = {
  [E in keyof EndpointsSchema]-?: Schema[E] & {
    endpoint: Endpoint<C, NonNullable<Schema[E]>>
    handlers: EndpointHandlers<C, NonNullable<Schema[E]>>
  }
}

type X = Endpoint<CommerceAPI, NonNullable<EndpointsSchema['cart']>>

export type EndpointSchemaBase = {
  options: {}
  operations: {
    [k: string]: { data?: any; body?: any }
  }
}

export type OperationData<T> = T extends { data?: infer D; body?: any }
  ? D
  : never

export type EndpointSchema<
  E extends keyof EndpointsSchema,
  Handlers extends EndpointsSchema[E]
> = Handlers

export type Endpoint<
  C extends CommerceAPI,
  E extends EndpointSchemaBase
> = APIEndpoint<
  C,
  EndpointHandlers<C, E>,
  OperationData<E['operations'][keyof E['operations']]>,
  E['options']
>

export type EndpointHandlers<
  C extends CommerceAPI,
  E extends EndpointSchemaBase
> = {
  [H in keyof E['operations']]: APIHandler<
    C,
    EndpointHandlers<C, E>,
    E['operations'][H]['data'],
    E['operations'][H]['body'],
    E['options']
  >
}

export type CommerceEndpointsSchema<C> = C extends CommerceAPI<any, infer E>
  ? E
  : never

export type HandlerOperations<E> = E extends APIEndpoint<any, any, infer T>
  ? T
  : never

export type HandlerOptions<E> = E extends APIEndpoint<any, any, any, infer T>
  ? T
  : never

export type APIProvider = {
  config: CommerceAPIConfig
}

export class CommerceAPI<
  P extends APIProvider = APIProvider,
  E extends EndpointsSchema = EndpointsSchema
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
    operations: HandlerOperations<typeof context.handler>
    options?: HandlerOptions<typeof context.handler>
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

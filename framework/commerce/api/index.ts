import type { NextApiHandler } from 'next'
import type { RequestInit, Response } from '@vercel/fetch'
import type { APIEndpoint, APIHandler } from './utils/types'
import type { CartSchema } from '../types'

export type APISchemas = CartSchema

export type GetAPISchema<
  C extends CommerceAPI,
  S extends APISchemas = APISchemas
> = {
  schema: S
  endpoint: EndpointContext<C, S['endpoint']>
}

export type EndpointContext<
  C extends CommerceAPI,
  E extends EndpointSchemaBase
> = {
  handler: Endpoint<C, E>
  operations: EndpointHandlers<C, E>
}

export type EndpointSchemaBase = {
  options: {}
  operations: {
    [k: string]: { data?: any; body?: any }
  }
}

export type Endpoint<
  C extends CommerceAPI,
  E extends EndpointSchemaBase
> = APIEndpoint<C, EndpointHandlers<C, E>, any, E['options']>

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

export type APIProvider = {
  config: CommerceAPIConfig
}

export class CommerceAPI<P extends APIProvider = APIProvider> {
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

  endpoint<T extends GetAPISchema<any, any>>(
    context: T['endpoint'] & {
      config?: P['config']
      options?: T['schema']['endpoint']['options']
    }
  ): NextApiHandler {
    const commerce = this
    const cfg = this.getConfig(context.config)

    return function apiHandler(req, res) {
      return context.handler({
        req,
        res,
        commerce,
        config: cfg,
        operations: context.operations,
        options: context.options ?? {},
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

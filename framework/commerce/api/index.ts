import type { NextApiHandler } from 'next'
import type { RequestInit, Response } from '@vercel/fetch'
import type { APIEndpoint, APIHandler } from './utils/types'
import type { CartSchema } from '../types/cart'
import type { CustomerSchema } from '../types/customer'
import type { LoginSchema } from '../types/login'
import type { LogoutSchema } from '../types/logout'
import {
  defaultOperations,
  OPERATIONS,
  AllOperations,
  APIOperations,
} from './operations'

export type APISchemas =
  | CartSchema
  | CustomerSchema
  | LoginSchema
  | LogoutSchema

export type GetAPISchema<
  C extends CommerceAPI<any>,
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
  operations: APIOperations<any>
}

export type CommerceAPI<
  P extends APIProvider = APIProvider
> = CommerceAPICore<P> & AllOperations<P>

export class CommerceAPICore<P extends APIProvider = APIProvider> {
  constructor(readonly provider: P) {}

  getConfig(userConfig: Partial<P['config']> = {}): P['config'] {
    return Object.entries(userConfig).reduce(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.provider.config }
    )
  }

  setConfig(newConfig: Partial<P['config']>) {
    Object.assign(this.provider.config, newConfig)
  }
}

export function getCommerceApi<P extends APIProvider>(
  customProvider: P
): CommerceAPI<P> {
  const commerce = Object.assign(
    new CommerceAPICore(customProvider),
    defaultOperations as AllOperations<P>
  )
  const ops = customProvider.operations

  OPERATIONS.forEach((k) => {
    const op = ops[k]
    if (op) {
      commerce[k] = op({ commerce }) as AllOperations<P>[typeof k]
    }
  })

  return commerce
}

export function getEndpoint<
  P extends APIProvider,
  T extends GetAPISchema<any, any>
>(
  commerce: CommerceAPI<P>,
  context: T['endpoint'] & {
    config?: P['config']
    options?: T['schema']['endpoint']['options']
  }
): NextApiHandler {
  const cfg = commerce.getConfig(context.config)

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

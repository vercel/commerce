import type { NextRequest } from 'next/server'
import type { APIEndpoint, APIHandler, APIResponse } from './utils/types'
import type { CartSchema } from '../types/cart'
import type { CustomerSchema } from '../types/customer'
import type { LoginSchema } from '../types/login'
import type { LogoutSchema } from '../types/logout'
import type { SignupSchema } from '../types/signup'
import type { ProductsSchema } from '../types/product'
import type { WishlistSchema } from '../types/wishlist'
import type { CheckoutSchema } from '../types/checkout'
import type { CustomerCardSchema } from '../types/customer/card'
import type { CustomerAddressSchema } from '../types/customer/address'

import { withOperationCallback } from './utils/with-operation-callback'

import {
  OPERATIONS,
  AllOperations,
  APIOperations,
  defaultOperations,
} from './operations'

export type APISchemas =
  | CartSchema
  | CustomerSchema
  | LoginSchema
  | LogoutSchema
  | SignupSchema
  | ProductsSchema
  | WishlistSchema
  | CheckoutSchema
  | CustomerCardSchema
  | CustomerAddressSchema

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
  handlers: EndpointHandlers<C, E>
}

export type EndpointSchemaBase = {
  options: {}
  handlers: {
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
  [H in keyof E['handlers']]: APIHandler<
    C,
    EndpointHandlers<C, E>,
    NonNullable<E['handlers'][H]>['data'],
    NonNullable<E['handlers'][H]>['body'],
    E['options']
  >
}

export type APIProvider = {
  config: CommerceAPIConfig
  operations: APIOperations<any>
}

export type CommerceAPI<P extends APIProvider = APIProvider> =
  CommerceAPICore<P> & AllOperations<P>

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
      commerce[k] = withOperationCallback(
        k,
        op({ commerce })
      ) as AllOperations<P>[typeof k]
    }
  })

  return commerce
}

export type EndpointHandler = (req: NextRequest) => Promise<APIResponse>

export function getEndpoint<
  P extends APIProvider,
  T extends GetAPISchema<any, any>
>(
  commerce: CommerceAPI<P>,
  context: T['endpoint'] & {
    config?: P['config']
    options?: T['schema']['endpoint']['options']
  }
): EndpointHandler {
  const cfg = commerce.getConfig(context.config)
  return function apiHandler(req) {
    return context.handler({
      req,
      commerce,
      config: cfg,
      handlers: context.handlers,
      options: context.options ?? {},
    })
  }
}

export const createEndpoint =
  <API extends GetAPISchema<any, any>>(endpoint: API['endpoint']) =>
  <P extends APIProvider>(
    commerce: CommerceAPI<P>,
    context?: Partial<API['endpoint']> & {
      config?: P['config']
      options?: API['schema']['endpoint']['options']
    }
  ): EndpointHandler => {
    return getEndpoint(commerce, { ...endpoint, ...context })
  }

export interface CommerceAPIConfig {
  locale?: string
  locales?: string[]
  commerceUrl: string
  apiToken: string
  cartCookie: string
  cartCookieMaxAge: number
  customerCookie: string
  fetch<Data = any, Variables = any>(
    query: string,
    queryData?: CommerceAPIFetchOptions<Variables>,
    headers?: HeadersInit
  ): Promise<GraphQLFetcherResult<Data>>
}

export type GraphQLFetcher<
  Data extends GraphQLFetcherResult = GraphQLFetcherResult,
  Variables = any
> = (
  query: string,
  queryData?: CommerceAPIFetchOptions<Variables>
) => Promise<Data>

export interface GraphQLFetcherResult<Data = any> {
  data: Data
  res: Response
}

export interface CommerceAPIFetchOptions<Variables> {
  variables?: Variables
  preview?: boolean
}

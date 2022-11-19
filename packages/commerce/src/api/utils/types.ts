import type { NextRequest } from 'next/server'
import type { CommerceAPI } from '..'

export type ErrorData = { message: string; code?: string }

export type APIResponse<Data = any> = {
  data?: Data
  errors?: ErrorData[]
  status?: number
  headers?: Record<string, number | string | string[]> | Headers
  /**
   *  @type {string}
   *  @example redirectTo: '/cart'
   */
  redirectTo?: string
}

export type APIHandlerContext<
  C extends CommerceAPI,
  H extends APIHandlers<C> = {},
  Data = any,
  Options extends {} = {}
> = {
  req: NextRequest
  commerce: C
  config: C['provider']['config']
  handlers: H
  options: Options
}

export type APIHandler<
  C extends CommerceAPI,
  H extends APIHandlers<C> = {},
  Data = any,
  Body = any,
  Options extends {} = {}
> = (
  context: APIHandlerContext<C, H, Data, Options> & { body: Body }
) => Promise<APIResponse<Data>>

export type APIHandlers<C extends CommerceAPI> = {
  [k: string]: APIHandler<C, any, any, any, any>
}

export type APIEndpoint<
  C extends CommerceAPI = CommerceAPI,
  H extends APIHandlers<C> = {},
  Data = any,
  Options extends {} = {}
> = (
  context: APIHandlerContext<C, H, Data, Options>
) => Promise<APIResponse<Data>>

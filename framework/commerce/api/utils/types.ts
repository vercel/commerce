import type { NextApiRequest, NextApiResponse } from 'next'
import type { CommerceAPI } from '..'

export type ErrorData = { message: string; code?: string }

export type APIResponse<Data = any> =
  | { data: Data; errors?: ErrorData[] }
  // If `data` doesn't include `null`, then `null` is only allowed on errors
  | (Data extends null
      ? { data: null; errors?: ErrorData[] }
      : { data: null; errors: ErrorData[] })

export type APIHandlerContext<
  C extends CommerceAPI,
  H extends APIHandlers<C> = {},
  Data = any,
  Options extends {} = {}
> = {
  req: NextApiRequest
  res: NextApiResponse<APIResponse<Data>>
  commerce: C
  config: C['provider']['config']
  handlers: H
  /**
   * Custom configs that may be used by a particular handler
   */
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
) => void | Promise<void>

export type APIHandlers<C extends CommerceAPI> = {
  [k: string]: APIHandler<C, any, any, any, any>
}

export type APIEndpoint<
  C extends CommerceAPI = CommerceAPI,
  H extends APIHandlers<C> = {},
  Data = any,
  Options extends {} = {}
> = (context: APIHandlerContext<C, H, Data, Options>) => void | Promise<void>

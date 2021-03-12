import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { APIProvider } from '..'

export type APIResponse<Data = any> = {
  data: Data
  errors?: { message: string; code?: string }[]
}

export type APIHandlerContext<
  P extends APIProvider,
  H extends APIHandlers<P, Data> = {},
  Data = any,
  Options extends {} = {}
> = {
  req: NextApiRequest
  res: NextApiResponse<APIResponse<Data>>
  provider: P
  config: P['config']
  handlers: H
  /**
   * Custom configs that may be used by a particular handler
   */
  options: Options
}

export type APIHandler<
  P extends APIProvider,
  H extends APIHandlers<P, Data> = {},
  Data = any,
  Body = any,
  Options extends {} = {}
> = (
  context: APIHandlerContext<P, H, Data, Options> & { body: Body }
) => void | Promise<void>

export type APIHandlers<P extends APIProvider, Data = any> = {
  [k: string]: APIHandler<P, any, Data, any>
}

export type APIEndpoint<
  P extends APIProvider = APIProvider,
  H extends APIHandlers<P, Data> = {},
  Data = any,
  Options extends {} = {}
> = (context: APIHandlerContext<P, H, Data, Options>) => void | Promise<void>

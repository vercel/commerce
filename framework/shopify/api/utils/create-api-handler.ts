import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ShopifyConfig, getConfig } from '..'

export type ShopifyApiHandler<
  T = any,
  H extends ShopifyHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<ShopifyApiResponse<T>>,
  config: ShopifyConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type ShopifyHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<ShopifyApiResponse<T>>
  config: ShopifyConfig
  body: Body
}) => void | Promise<void>

export type ShopifyHandlers<T = any> = {
  [k: string]: ShopifyHandler<T, any>
}

export type ShopifyApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends ShopifyHandlers = {},
  Options extends {} = {}
>(
  handler: ShopifyApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: ShopifyConfig
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops, opts)
    }
  }
}

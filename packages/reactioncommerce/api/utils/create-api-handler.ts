import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { ReactionCommerceConfig, getConfig } from '..'

export type ReactionCommerceApiHandler<
  T = any,
  H extends ReactionCommerceHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<ReactionCommerceApiResponse<T>>,
  config: ReactionCommerceConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type ReactionCommerceHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<ReactionCommerceApiResponse<T>>
  config: ReactionCommerceConfig
  body: Body
}) => void | Promise<void>

export type ReactionCommerceHandlers<T = any> = {
  [k: string]: ReactionCommerceHandler<T, any>
}

export type ReactionCommerceApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends ReactionCommerceHandlers = {},
  Options extends {} = {}
>(
  handler: ReactionCommerceApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: ReactionCommerceConfig
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

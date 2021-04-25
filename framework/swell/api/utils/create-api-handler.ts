import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { SwellConfig, getConfig } from '..'

export type SwellApiHandler<
  T = any,
  H extends SwellHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<SwellApiResponse<T>>,
  config: SwellConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type SwellHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<SwellApiResponse<T>>
  config: SwellConfig
  body: Body
}) => void | Promise<void>

export type SwellHandlers<T = any> = {
  [k: string]: SwellHandler<T, any>
}

export type SwellApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends SwellHandlers = {},
  Options extends {} = {}
>(
  handler: SwellApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: SwellConfig
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

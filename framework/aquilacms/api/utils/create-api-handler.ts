import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { AquilacmsConfig, getConfig } from '..'

export type AquilacmsApiHandler<
  T = any,
  H extends AquilacmsHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<AquilacmsApiResponse<T>>,
  config: AquilacmsConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type AquilacmsHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<AquilacmsApiResponse<T>>
  config: AquilacmsConfig
  body: Body
}) => void | Promise<void>

export type AquilacmsHandlers<T = any> = {
  [k: string]: AquilacmsHandler<T, any>
}

export type AquilacmsApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends AquilacmsHandlers = {},
  Options extends {} = {}
>(
  handler: AquilacmsApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: AquilacmsConfig
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

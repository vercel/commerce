import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { SaleorConfig, getConfig } from '..'

export type SaleorApiHandler<T = any, H extends SaleorHandlers = {}, Options extends {} = {}> = (
  req: NextApiRequest,
  res: NextApiResponse<SaleorApiResponse<T>>,
  config: SaleorConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type SaleorHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<SaleorApiResponse<T>>
  config: SaleorConfig
  body: Body
}) => void | Promise<void>

export type SaleorHandlers<T = any> = {
  [k: string]: SaleorHandler<T, any>
}

export type SaleorApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<T = any, H extends SaleorHandlers = {}, Options extends {} = {}>(
  handler: SaleorApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: SaleorConfig
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

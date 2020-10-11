import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { BigcommerceConfig, getConfig } from '..'

export type BigcommerceApiHandler<
  T = any,
  H extends BigcommerceHandlers = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<BigcommerceApiResponse<T>>,
  config: BigcommerceConfig,
  handlers: H
) => void | Promise<void>

export type BigcommerceHandler<T = any, Body = any> = (options: {
  req: NextApiRequest
  res: NextApiResponse<BigcommerceApiResponse<T>>
  config: BigcommerceConfig
  body: Body
}) => void | Promise<void>

export type BigcommerceHandlers<T = any> = {
  [k: string]: BigcommerceHandler<T, any>
}

export type BigcommerceApiResponse<T> = {
  data: T | null
  errors?: { message: string }[]
}

export default function createApiHandler<H extends BigcommerceHandlers>(
  handler: BigcommerceApiHandler<any, H>,
  handlers: H
) {
  return function getApiHandler({
    config,
    operations,
  }: {
    config?: BigcommerceConfig
    operations?: Partial<H>
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops)
    }
  }
}

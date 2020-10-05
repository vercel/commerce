import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { BigcommerceConfig, getConfig } from '..'

export type BigcommerceApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<BigcommerceApiResponse<T>>,
  config: BigcommerceConfig
) => void | Promise<void>

export type BigcommerceApiResponse<T> = {
  data: T | null
  errors?: { message: string }[]
}

export default function createApiHandler(handler: BigcommerceApiHandler) {
  return function getApiHandler({
    config,
  }: { config?: BigcommerceConfig } = {}): NextApiHandler {
    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config))
    }
  }
}

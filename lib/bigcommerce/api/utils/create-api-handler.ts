import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { BigcommerceConfig, getConfig } from '..'

export type BigcommerceApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  config: BigcommerceConfig
) => void | Promise<void>

export default function createApiHandler(handler: BigcommerceApiHandler) {
  return function getApiHandler({
    config,
  }: { config?: BigcommerceConfig } = {}): NextApiHandler {
    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config))
    }
  }
}

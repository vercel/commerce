import type { NextApiRequest, NextApiResponse } from 'next'
import isAllowedMethod, { HTTP_METHODS } from './is-allowed-method'
import { APIHandler } from './types'

export default function isAllowedOperation(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedHandlers: { [k in HTTP_METHODS]?: APIHandler<any> }
) {
  const methods = Object.keys(allowedHandlers) as HTTP_METHODS[]
  const allowedMethods = methods.reduce<HTTP_METHODS[]>((arr, method) => {
    if (allowedHandlers[method]) {
      arr.push(method)
    }
    return arr
  }, [])

  return isAllowedMethod(req, res, allowedMethods)
}

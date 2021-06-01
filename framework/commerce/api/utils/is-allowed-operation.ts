import type { NextApiRequest, NextApiResponse } from 'next'
import isAllowedMethod, { HTTP_METHODS } from './is-allowed-method'
import { APIHandler } from './types'

export default function isAllowedOperation(
  req: NextApiRequest,
  res: NextApiResponse,
  allowedOperations: { [k in HTTP_METHODS]?: APIHandler<any, any> }
) {
  const methods = Object.keys(allowedOperations) as HTTP_METHODS[]
  const allowedMethods = methods.reduce<HTTP_METHODS[]>((arr, method) => {
    if (allowedOperations[method]) {
      arr.push(method)
    }
    return arr
  }, [])

  return isAllowedMethod(req, res, allowedMethods)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import isAllowedMethod, { HTTP_METHODS } from './is-allowed-method'
import { APIHandler } from './types'

/**
 * Checks if the request method is allowed
 * @throws Error if the method is not allowed
 */
export default function validateHandlers(
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

  if (!isAllowedMethod(req, res, allowedMethods)) {
    throw new Error(`Method ${req.method} Not Allowed for this url: ${req.url}`)
  }
}

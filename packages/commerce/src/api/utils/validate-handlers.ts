import type { NextApiRequest, NextApiResponse } from 'next'
import isAllowedMethod, { HTTP_METHODS } from './is-allowed-method'
import { APIHandler } from './types'

/**
 * Validates the request method and throws an error if it's not allowed, or if the handler is not implemented.
 * and stops the execution of the handler.
 * @param req The request object.
 * @param res The response object.
 * @param allowedOperations An object containing the handlers for each method.
 * @throws Error when the method is not allowed or the handler is not implemented.
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

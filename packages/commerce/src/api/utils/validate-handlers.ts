import type { NextRequest } from 'next/server'
import type { APIHandler } from './types'
import validateMethod, { HTTP_METHODS } from './validate-method'
/**
 * Validates the request method and throws an error if it's not allowed, or if the handler is not implemented.
 * and stops the execution of the handler.
 * @param req The request object.
 * @param allowedOperations An object containing the handlers for each method.
 * @throws Error when the method is not allowed or the handler is not implemented.
 */
export default function validateHandlers(
  req: NextRequest,
  allowedOperations: { [k in HTTP_METHODS]?: APIHandler<any, any> }
) {
  const methods = Object.keys(allowedOperations) as HTTP_METHODS[]
  const allowedMethods = methods.reduce<HTTP_METHODS[]>((arr, method) => {
    if (allowedOperations[method]) {
      arr.push(method)
    }
    return arr
  }, [])

  return validateMethod(req, allowedMethods)
}

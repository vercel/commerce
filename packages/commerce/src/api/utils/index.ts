import type { NextApiRequest, NextApiResponse } from 'next'
import type { ZodSchema } from 'zod'
import type { APIResponse } from './types'

import { NextRequest } from 'next/server'

/**
 * Parses the output data of the API handler and returns a valid APIResponse
 * or throws an error if the data is invalid.
 * @param res  APIResponse
 * @param parser ZodSchema
 */
export const parse = <T>(res: APIResponse<T>, parser: ZodSchema) => {
  if (res.data) {
    res.data = parser.parse(res.data)
  }
  return res
}

/**
 * Returns the body of the request as a JSON object.
 * @param req NextRequest
 */
export const getInput = (req: NextRequest) => req.json().catch(() => ({}))

/**
 * Convert NextApiRequest to NextRequest
 * @param req NextApiRequest
 * @param path string
 */
export const transformRequest = (req: NextApiRequest, path: string) => {
  const headers = new Headers()
  let body

  for (let i = 0; i < req.rawHeaders.length; i += 2) {
    headers.append(req.rawHeaders[i], req.rawHeaders[i + 1])
  }

  if (
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE'
  ) {
    body = JSON.stringify(req.body)
  }

  return new NextRequest(`https://${req.headers.host}/api/commerce/${path}`, {
    headers,
    method: req.method,
    body,
  })
}

/**
 * Sets the custom headers received in the APIResponse in the
 * @param headers Record<string, string|string[]> | Headers | undefined
 * @returns Headers
 */
export const transformHeaders = (
  headers: Record<string, string | number | string[]> | Headers = {}
) => {
  if (headers instanceof Headers) {
    return headers
  }

  const newHeaders = new Headers()

  Object.entries(headers).forEach(([key, value]) => {
    newHeaders.append(key, value as string)
  })

  return newHeaders
}

export const setHeaders = (
  res: NextApiResponse,
  headers: Record<string, string | number | string[]> | Headers = {}
) => {
  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      res.setHeader(key, value)
    })
  } else {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value)
    })
  }
}

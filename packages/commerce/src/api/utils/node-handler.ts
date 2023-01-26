import type { NextApiRequest, NextApiResponse } from 'next'
import type { APIProvider, CommerceAPI, EndpointHandler } from '..'

import { normalizeApiError } from './errors'
import { transformRequest, setHeaders } from '.'

export default function nodeHandler<P extends APIProvider>(
  commerce: CommerceAPI<P>,
  endpoints: {
    [key: string]: (commerce: CommerceAPI<P>) => EndpointHandler
  }
) {
  const paths = Object.keys(endpoints)

  const handlers = paths.reduce<Record<string, EndpointHandler>>(
    (acc, path) =>
      Object.assign(acc, {
        [path]: endpoints[path](commerce),
      }),
    {}
  )

  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!req.query.commerce) {
        throw new Error(
          'Invalid configuration. Please make sure that the /pages/api/commerce/[[...commerce]].ts route is configured correctly, and it passes the commerce instance.'
        )
      }

      /**
       * Get the url path
       */
      const path = Array.isArray(req.query.commerce)
        ? req.query.commerce.join('/')
        : req.query.commerce

      // Check if the handler for this path exists and return a 404 if it doesn't
      if (!paths.includes(path)) {
        throw new Error(
          `Endpoint handler not implemented. Please use one of the available api endpoints: ${paths.join(
            ', '
          )}`
        )
      }

      const output = await handlers[path](transformRequest(req))
      const { status, errors, data, redirectTo, headers } = output

      setHeaders(res, headers)

      if (output instanceof Response) {
        return res.end(output.body)
      }

      if (redirectTo) {
        return res.redirect(redirectTo)
      }

      res.status(status || 200).json({
        data,
        errors,
      })
    } catch (error) {
      const output = normalizeApiError(error)

      if (output instanceof Response) {
        return res.end(output.body)
      }

      const { status = 500, ...rest } = output
      res.status(status).json(rest)
    }
  }
}

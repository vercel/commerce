import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { APIProvider, CommerceAPI } from '..'

import { normalizeError } from '../utils/errors'

/**
 * Handles the catch-all api endpoint for the Commerce API.
 * @param {CommerceAPI} commerce The Commerce API instance.
 * @param endpoints An object containing the handlers for each endpoint.
 */
export default function createEndpoints<P extends APIProvider>(
  commerce: CommerceAPI<P>,
  endpoints: {
    [key: string]: (commerce: CommerceAPI<P>) => NextApiHandler
  }
) {
  const paths = Object.keys(endpoints)

  const handlers = paths.reduce<Record<string, NextApiHandler>>(
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

      /**
       * Check if the handler for this path exists and return a 404 if it doesn't
       */
      if (!paths.includes(path)) {
        throw new Error(
          `Endpoint handler not implemented. Please use one of the available api endpoints: ${paths.join(
            ', '
          )}`
        )
      }

      const data = await handlers[path](req, res)

      /**
       * If the handler returns a value but the response hasn't been sent yet, send it
       */
      if (!res.headersSent) {
        res.status(200).json({
          data,
        })
      }
    } catch (error) {
      console.error(error)
      const { status, data, errors } = normalizeError(error)
      res.status(status).json({
        data,
        errors,
      })
    }
  }
}

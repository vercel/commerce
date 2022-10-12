import type { APIProvider, CommerceAPI, EndpointHandler } from '..'

import { NextRequest, NextResponse } from 'next/server'
import { normalizeApiError } from '../utils/errors'

/**
 * Next.js Commerce API endpoints handler. Based on the path, it will call the corresponding endpoint handler,
 * exported from the `endpoints` folder of the provider.
 * @param {CommerceAPI} commerce The Commerce API instance.
 * @param endpoints An object containing the handlers for each endpoint.
 */
export default function createEndpoints<P extends APIProvider>(
  commerce: CommerceAPI<P>,
  endpoints: Record<string, (commerce: CommerceAPI<P>) => EndpointHandler>
) {
  const endpointsKeys = Object.keys(endpoints)
  const handlers = endpointsKeys.reduce<Record<string, EndpointHandler>>(
    (acc, endpoint) =>
      Object.assign(acc, {
        [endpoint]: endpoints[endpoint](commerce),
      }),
    {}
  )

  return async (req: NextRequest) => {
    try {
      const { pathname } = new URL(req.url)

      /**
       * Get the current endpoint by removing the leading and trailing slash & base path.
       * Csovers: /api/commerce/cart & /checkout
       */
      const endpoint = pathname
        .replace('/api/commerce/', '')
        .replace(/^\/|\/$/g, '')

      // Check if the handler for this path exists and return a 404 if it doesn't
      if (!endpointsKeys.includes(endpoint)) {
        throw new Error(
          `Endpoint "${endpoint}" not implemented. Please use one of the available api endpoints: ${endpointsKeys.join(
            ', '
          )}`
        )
      }

      /**
       * Executes the handler for this endpoint, provided by the provider,
       * parses the input body and returns the parsed output
       */
      const output = await handlers[endpoint](req)

      // If the output is a NextResponse, return it directly (E.g. checkout page & validateMethod util)
      if (output instanceof NextResponse) {
        return output
      }

      // If the output contains a redirectTo property, return a NextResponse with the redirect
      if (output.redirectTo) {
        return NextResponse.redirect(output.redirectTo, {
          headers: output.headers,
        })
      }

      const { data = null, errors, status, headers } = output

      return NextResponse.json(
        { data, errors },
        {
          status,
          headers,
        }
      )
    } catch (error) {
      const output = normalizeApiError(error)
      return output instanceof NextResponse
        ? output
        : NextResponse.json(output, { status: output.status ?? 500 })
    }
  }
}

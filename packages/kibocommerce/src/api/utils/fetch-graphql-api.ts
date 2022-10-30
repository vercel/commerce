import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { KiboCommerceConfig } from '../index'

import { APIAuthenticationHelper } from './api-auth-helper'

const fetchGraphqlApi: (
  getConfig: () => KiboCommerceConfig
) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, headers?: HeadersInit) => {
    const config = getConfig()
    const authHelper = new APIAuthenticationHelper(config)
    const apiToken = await authHelper.getAccessToken()
    const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
      method: 'POST',
      headers: {
        ...headers,
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      console.warn(
        `Kibo API Request Correlation ID: ${res.headers.get(
          'x-vol-correlation'
        )}`
      )
      throw new FetcherError({
        errors: json.errors ?? [
          { message: 'Failed to fetch KiboCommerce API' },
        ],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchGraphqlApi

import { FetcherError } from '@commerce/utils/errors'
import type { GraphQLFetcher } from '@commerce/api'
import type { KiboCommerceConfig } from '../index'
import fetch from './fetch'

const fetchGraphqlApi: (
  getConfig: () => KiboCommerceConfig
) => GraphQLFetcher = (getConfig) => async (
  query: string,
  { variables, preview } = {},
  fetchOptions
) => {
  const config = getConfig()
  const res = await fetch(config.commerceUrl + (preview ? '/preview' : ''), {
    ...fetchOptions,
    method: 'POST',
    headers: {
      ...fetchOptions?.headers,
      Authorization: `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
      // Need to fetch access token from cookie
      // 'x-vol-user-claims':
      // 'z40ROeWoZYd65SxBHSqnq/j/SRP0tIBHAf/3Sxw2MJLS8lmj1sF9Y+8eWaTObnCbAtFkiNx/BPfojtUFYQj2P9aVPgHsR+IaTpeAdfG1AM0fMLFvIrDbHK6E/BKhupU5NJQAFwYsoImRzIh8jOpXrigBWH9OW/dBjOtuAJaDaDRHdZ3xyDKZQnFa24IZN6b/UZYHf4r6arUU3MjPoVibQdtBObtJPYwe3XtOI/xaInqpehTJPq9nTZlTWR8Tv59UelC4bVWIuGtSAdawmuSS7H8pb5PemmB9MwMeLkGaWZsaRdxMfdOJE8REGqOYr3j89iEj/0a6G1zraVbLzGXyW0hVkz6InxARzA4p96n2n+ZCwWI/olcQKTxJCLsoZ3dVVkWretgUJFMxzAbzDEDtUIda+VuhzhhmlY4SFgOjxtSIudlyAcYs4xwksjDhBtt8RrTyobCUUau1sfht9Zf1pw==',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    throw new FetcherError({
      errors: json.errors ?? [{ message: 'Failed to fetch KiboCommerce API' }],
      status: res.status,
    })
  }

  return { data: json.data, res }
}

export default fetchGraphqlApi

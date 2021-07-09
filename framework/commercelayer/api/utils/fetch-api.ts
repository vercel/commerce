import type { RequestInit } from '@vercel/fetch'
import { FetcherError } from '@commerce/utils/errors'
import { CommercelayerConfig, getAccessToken, UserCredentials } from '../index'
import fetch from './fetch'

const fetchApi = <T>(getConfig: () => CommercelayerConfig) =>
  async (
    query: string,
    endpoint: string,
    fetchOptions?: RequestInit,
    user?: UserCredentials
  ) => {
    const config = getConfig()
    const getToken = await getAccessToken(user)
    const token = getToken.accessToken
    const res = await fetch(config.commerceUrl + endpoint, {
      ...fetchOptions,
      method: 'POST',
      headers: {
        ...fetchOptions?.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query
      }),
    })

    const json = await res.json()
    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [{ message: 'Failed to fetch for API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchApi

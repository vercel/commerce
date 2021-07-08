import { FetcherError } from '@commerce/utils/errors'
import type { Fetcher } from '@commerce/utils/types'
import { handleFetchResponse } from './utils'
import { API_URL } from './const'
import { getCustomerToken } from './utils'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

const fetcher: Fetcher = async ({
  url,
  method = 'GET',
  variables,
  body: bodyObj,
  query,
}) => {
  // if no URL is passed but we have a `query` param, we assume it's GraphQL
  if (!url && query) {
    const customerToken = getCustomerToken()
    const authorizationHeader = {}

    if (customerToken) {
      authorizationHeader['Authorization'] = `Bearer ${customerToken}`
    }

    return handleFetchResponse(
      await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ query, variables }),
        headers: {
          'Content-Type': 'application/json',
          ...authorizationHeader,
        },
      })
    )
  }

  const hasBody = Boolean(variables || bodyObj) && method !== 'GET'
  const body = hasBody
    ? JSON.stringify(variables ? { variables } : bodyObj)
    : undefined
  const headers = hasBody ? { 'Content-Type': 'application/json' } : undefined
  const res = await fetch(url!, { method, body, headers })

  if (res.ok) {
    const { data } = await res.json()
    return data
  }

  throw await getError(res)
}

export default fetcher

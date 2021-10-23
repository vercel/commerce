import { commerce } from './lib/commercejs'
import { Fetcher } from '@commerce/utils/types'

// Fetches from an API route within /api/endpoints directory
const customFetcher: Fetcher = async ({ method, url, body }) => {
  const response = await fetch(url!, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => response.data)

  return response
}

const fetcher: Fetcher = async ({ url, query, method, variables, body }) => {
  // If a URL is passed, it means that the fetch needs to be passed on to a custom API route.
  const isCustomFetch = !!url
  if (isCustomFetch) {
    const data = await customFetcher({ url, method, body })
    return data
  }

  // Fetch using the Commerce.js SDK.
  const variablesArgument = Array.isArray(variables) ? variables : [variables]
  const resource = commerce[query as keyof typeof commerce]

  // @ts-ignore
  const data = await resource?.[method!](...variablesArgument)
  return data
}

export default fetcher

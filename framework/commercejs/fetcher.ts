import { commerce } from './lib/commercejs'
import type { Fetcher } from '@commerce/utils/types'
import { FetcherError } from '@commerce/utils/errors'

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

  // Fetch using the Commerce.js SDK, but make sure that it's a valid method.

  const resource = commerce[query as keyof typeof commerce]
  if (!resource) {
    throw new FetcherError({
      errors: [
        { message: `Query ${query} does not exist on Commerce.js SDK.` },
      ],
      status: 400,
    })
  }

  // @ts-ignore
  // TODO - apply types like in framework/commercejs/api/utils/sdk-fetch.ts
  if (!resource?.[method!]) {
    throw new FetcherError({
      errors: [
        {
          message: `Method ${method} does not exist on Commerce.js SDK ${query} resource.`,
        },
      ],
      status: 400,
    })
  }

  const variablesArgument = Array.isArray(variables) ? variables : [variables]

  // @ts-ignore
  // TODO - apply types like in framework/commercejs/api/utils/sdk-fetch.ts
  const data = await resource?.[method!](...variablesArgument)
  return data
}

export default fetcher

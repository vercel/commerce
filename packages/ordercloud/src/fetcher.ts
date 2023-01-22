import { Fetcher } from '@vercel/commerce/utils/types'
import { handleFetchResponse } from './utils'

const clientFetcher: Fetcher = async ({ method, url, body }) => {
  return handleFetchResponse(
    await fetch(url!, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )
}

export default clientFetcher

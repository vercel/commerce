import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({ url = '', method = 'POST', body }) => {
  const res = await fetch(API_URL + url!, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json, text/plain',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return handleFetchResponse(res)
}

export default fetcher

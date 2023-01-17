import { Fetcher } from '@vercel/commerce/utils/types'
import { getCustomerToken } from './utils/token/customer-token'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({
  url = '',
  method = 'POST',
  body,
  variables = {
    useToken: true,
    contentType: 'application/json',
  },
}) => {
  const token = getCustomerToken()
  const res = await fetch(API_URL + url!, {
    method: method,
    headers: {
      'Content-Type': variables.contentType,
      accept: 'application/json, text/plain',
      ...(token && variables.useToken
        ? { Authorization: `Bearer ${token}` }
        : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  return handleFetchResponse(res)
}

export default fetcher

import { Fetcher } from '@vercel/commerce/utils/types'
import handleFetchResponse from './utils/handle-fetch-response'
import { getSalesChannelToken } from '@commercelayer/js-auth'
import Cookies from 'js-cookie'
import { ENDPOINT, CLIENTID, SCOPE } from './const'

export const fetcher: Fetcher = async ({ url, method, variables, query }) => {
  const token = await getSalesChannelToken({
    endpoint: ENDPOINT,
    clientId: CLIENTID,
    scope: SCOPE,
  })
  const customerToken = Cookies.get('CL_CUSTOMER_TOKEN')

  if (method == 'POST') {
    return handleFetchResponse(
      await fetch(url!, {
        method,
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${token?.accessToken}`, 
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify({
          data: {
            type: query,
            attributes: variables,
          },
        }),
      })
    )
  }

  if (method == 'GET') {
    return handleFetchResponse(
      await fetch(url!, {
        method,
        headers: {
          Accept: 'application/vnd.api+json',
          Authorization: `Bearer ${customerToken}`, 
          'Content-Type': 'application/vnd.api+json',
        }
      })
    )
  }
}

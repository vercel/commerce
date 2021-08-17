import { Fetcher } from '@commerce/utils/types'
import handleFetchResponse from './utils/handle-fetch-response'
import { ENDPOINT, CLIENTID, SCOPE } from './const'
import { getSalesChannelToken } from '@commercelayer/js-auth'

export const fetcher: Fetcher = async ({ url, method, variables, query }) => {
  const token = await getSalesChannelToken({
    endpoint: ENDPOINT,
    clientId: CLIENTID,
    scope: SCOPE,
  })

  return handleFetchResponse(
    await fetch(url!, {
      method,
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${token.accessToken}`,
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

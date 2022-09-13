import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({ url = API_URL, method = 'POST', body }) => {
  //const token = getToken()

  return handleFetchResponse(
    await fetch(url!, {
      method,
      body,
      headers: {
        //Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    })
  )
}

export default fetcher

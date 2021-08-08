import { Fetcher } from '@commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({
  url = API_URL,
  method = 'POST',
  variables,
  query,
}) => {
  const { locale, ...vars } = variables ?? {}
  return handleFetchResponse(
    await fetch(url, {
      method,
      body: JSON.stringify({ query, variables: vars }),
      headers: { 'Content-Type': 'application/json' },
    })
  )
}

export default fetcher

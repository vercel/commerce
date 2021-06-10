import { Fetcher } from '@commerce/utils/types'

const shopApiUrl = '/data.json'

export const fetcher: Fetcher = async ({
  url,
  method = 'GET',
  variables,
  query,
  body: bodyObj,
}) => {
  const res = await fetch(shopApiUrl)

  if (res.ok) {
    const { data } = await res.json()
    return data
  }
  throw res
}

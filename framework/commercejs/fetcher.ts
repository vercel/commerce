import { Fetcher } from '@commerce/utils/types'

const clientFetcher: Fetcher = async ({ method, url, body }) => {
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

export default clientFetcher

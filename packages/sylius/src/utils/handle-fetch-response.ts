import { FetcherError } from '@vercel/commerce/utils/errors'

export function getError(errors: any[] | null, status: number) {
  errors = errors ?? [{ message: 'Failed to fetch Sylius API' }]
  return new FetcherError({ errors, status })
}

export async function getAsyncError(res: Response) {
  const data = await res.json()
  return getError(data.errors, res.status)
}

const handleFetchResponse = async (res: Response) => {
  if (res.ok) {
    if (res.status === 204) {
      return true
    }
    return await res.json()
  }

  throw await getAsyncError(res)
}

export default handleFetchResponse

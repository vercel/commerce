import { RequestDocument, Variables } from 'graphql-request/dist/types'
import fetcher from './fetcher'

const gglFetcher = async <T>(
  ...params: [RequestDocument, Variables]
): Promise<T> => {
  const [query, variables] = params
  return fetcher<T>({ query, variables })
}

export default gglFetcher

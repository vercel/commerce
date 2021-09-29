import { rawRequest } from 'graphql-request'
import { RequestDocument, Variables } from 'graphql-request/dist/types'
import { LOCAL_STORAGE_KEY } from './constanst.utils'

interface QueryOptions {
  query: RequestDocument
  variables?: Variables
  onLoad?: (loading: boolean) => any
  key?: string
}

const rawFetcher = <T>({
  query,
  variables,
  onLoad = () => true,
}: QueryOptions): Promise<{ data: T; headers: any }> => {
  onLoad(true)
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
  return rawRequest<T>(
    process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL as string,
    query as string,
    variables,
    token ? { Authorization: 'Bearer ' + token } : {}
  )
    .then(({ data, headers }) => {
      return { data, headers }
    })
    .finally(() => onLoad(false))
}

export default rawFetcher

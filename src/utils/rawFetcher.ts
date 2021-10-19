import { GraphQLClient } from 'graphql-request'
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

  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL as string, {
    credentials: 'include',
    mode: 'cors',
    headers: token ? { Authorization: 'Bearer ' + token } : {},
  })

  return graphQLClient.rawRequest<T>(
    query as string,
    variables,
      )
  .then(({ data, headers }) => {
    return { data, headers }
  })
    .finally(() => onLoad(false))
}

export default rawFetcher

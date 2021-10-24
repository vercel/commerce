import { GraphQLClient } from 'graphql-request'
import { RequestDocument, Variables } from 'graphql-request/dist/types'
import { LOCAL_STORAGE_KEY } from './constanst.utils'

interface QueryOptions {
  query: RequestDocument
  variables?: Variables
  onLoad?: (loading: boolean) => any
  key?: string
}

const fetcher = async <T>(options: QueryOptions): Promise<T> => {
  const { query, variables } = options
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)
  const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL as string, {
    credentials: 'include',
    mode: 'cors',
    headers: token ? { Authorization: 'Bearer ' + token } : {},
  })

  const res = await graphQLClient.request<T>(
    query,
    variables,
  )

  return res
}

export default fetcher

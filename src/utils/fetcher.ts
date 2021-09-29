import { request } from 'graphql-request'
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
  const res = await request<T>(
    process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL as string,
    query,
    variables,
    token ? { Authorization: 'Bearer ' + token } : {}
  )

  return res
}

export default fetcher

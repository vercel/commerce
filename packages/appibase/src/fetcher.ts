import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'
import { GetAccessToken } from './api/utils/access-token'
import Kitsu from "kitsu";

const fetcher: Fetcher = async ({
  method = 'GET',
  variables,
  query = '',
  body
}) => {
  const { locale, ...vars } = variables ?? {}
  
  const api = new Kitsu({ baseURL: API_URL + '/api/v1', camelCaseTypes: false, pluralize: false })
  api.headers.Authorization = `Bearer ${await GetAccessToken()}`
  
  if(method === 'GET') return await api.get(query)
  else if(method === 'POST') return await api.create(query, body)
  else if(method === 'DELETE') return await api.remove(query, body)
  else if(method === 'PATCH') return await api.update(query, body)
}

export default fetcher


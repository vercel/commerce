import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import Kitsu from "kitsu";
import type { LocalConfig } from '../index'
import { API_URL } from '../../const'
import { GetAccessToken } from './access-token'

const fetchApi: (getConfig: () => LocalConfig) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, fetchOptions) => {
    const config = getConfig()
    
    const api = new Kitsu({ baseURL: API_URL + '/api/v1' })
    api.headers.Authorization = `Bearer ${await GetAccessToken()}`
    
    const res = await api.get(query)

    if (res.errors) {
      throw new FetcherError({
        errors: res.errors ?? [{ message: 'Failed to fetch for API' }],
        status: res.status,
      })
    }

    return { data: res.data, res }
  }

export default fetchApi

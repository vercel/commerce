import { commerce } from './lib/commercejs'
import { Fetcher } from '@commerce/utils/types'

const sdkFetch: Fetcher = async ({ query, method, variables = {} }) => {
  // @ts-ignore
  const data = await commerce[query!]?.[method](variables)
  return data
}

export default sdkFetch

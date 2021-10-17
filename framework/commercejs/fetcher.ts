import { commerce } from './lib/commercejs'
import { Fetcher } from '@commerce/utils/types'

const sdkFetch: Fetcher = async ({ query, method, variables }) => {
  const variablesArgument = Array.isArray(variables) ? variables : [variables]

  // @ts-ignore
  const data = await commerce[query!]?.[method](...variablesArgument)
  return data
}

export default sdkFetch

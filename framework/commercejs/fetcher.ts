import { commerce } from './lib/commercejs'
import { Fetcher } from '@commerce/utils/types'

const sdkFetch: Fetcher = async ({ query, method, variables }) => {
  const variablesArgument = Array.isArray(variables) ? variables : [variables]
  const resource = commerce[query as keyof typeof commerce]

  // @ts-ignore
  const data = await resource?.[method!](...variablesArgument)
  return data
}

export default sdkFetch

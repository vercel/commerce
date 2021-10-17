import { commerce } from '../../lib/commercejs'

type Queries = keyof typeof commerce

// TODO - generate this type dynamically from the Commerce type.
type Methods = 'list' | 'retrieve'

export type SdkFetch = (
  query: Queries,
  method: Methods,
  variables?: Array<any>
) => Promise<any>

const sdkFetch: SdkFetch = async (query, method, variables = []) => {
  const resource = commerce[query]

  // TODO
  // @ts-ignore
  const data = await resource[method](...variables)
  return data
}

export default sdkFetch

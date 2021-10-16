import { commerce } from '../../lib/commercejs'

type Queries = keyof typeof commerce

// TODO - generate this type dynamically from the Commerce type.
type Methods = string

export type FetchApi = (
  query: Queries,
  method: Methods,
  variables: Array<any>
) => Promise<any>

export async function fetchApi(
  query: Queries,
  method: Methods,
  variables: Array<any> = []
) {
  const resource = commerce[query]

  // TODO
  // @ts-ignore
  const data = await resource[method](...variables)
  // console.log('data is', data)
  return data
}

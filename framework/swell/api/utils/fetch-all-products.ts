import { SwellConfig } from '..'
import { SwellProduct } from '../../types'

const fetchAllProducts = async ({
  config,
  query,
  method,
  variables,
  acc = [],
}: {
  config: SwellConfig
  query: string
  method: string
  acc?: SwellProduct[]
  variables?: any
  cursor?: string
}): Promise<SwellProduct[]> => {
  const response = await config.fetchSwell(query, method, variables)

  acc = acc.concat(response.results)

  return acc
}

export default fetchAllProducts

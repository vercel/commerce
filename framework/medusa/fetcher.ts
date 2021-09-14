import { CommerceError } from '@commerce/utils/errors'
import { Fetcher } from '@commerce/utils/types'
import { callMedusa } from './utils/call-medusa'

enum Query {
  Auth = <any>'auth',
  Carts = <any>'carts',
  Customers = <any>'customers',
  Errors = <any>'errors',
  Orders = <any>'orders',
  Products = <any>'products',
  ReturnReasons = <any>'returnReasons',
  Returns = <any>'returns',
  ShippingOptions = <any>'shippingOptions',
  Swaps = <any>'swaps',
}

export const fetcher: Fetcher = async ({ method, query, variables }) => {
  if (!query) {
    throw new CommerceError({ message: 'An argument for query is required' })
  }

  if (!Object.values(Query).includes(query!)) {
    throw new CommerceError({
      message: `${query} is not a valid method argument. Available queries are ${Object.keys(
        Query
      )
        .map((k) => Query[k as any])
        .join(', ')}`,
    })
  }

  if (!method) {
    throw new CommerceError({ message: 'An argument for method is required' })
  }

  const response = await callMedusa(method, query, variables)

  if (response.statusText === 'OK') {
    const { data } = response
    return data
  }
  throw response
}

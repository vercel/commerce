import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { Customer } from '@commerce/types'
import { SWRHook } from '@commerce/utils/types'
import { getCustomerQuery, getCustomerToken } from '../utils'
import type { ShopifyProvider } from '..'

export default useCustomer as UseCustomer<ShopifyProvider>
export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    query: getCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
      variables: { customerAccessToken: getCustomerToken() },
    })
    return data.customer ?? null
  },
  useHook: ({ useData }) => (input) => {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })
  },
}

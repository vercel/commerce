import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import type { CustomerHook } from '../types/customer'
import { SWRHook } from '@vercel/commerce/utils/types'
import { getCustomerQuery, getCustomerToken } from '../utils'
import { GetCustomerQuery, GetCustomerQueryVariables } from '../../schema'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: getCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const data = await fetch<GetCustomerQuery, GetCustomerQueryVariables>({
        ...options,
        variables: { customerAccessToken: getCustomerToken() },
      })
      return data.customer
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}

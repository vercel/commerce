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
      const { customer } = await fetch<
        GetCustomerQuery,
        GetCustomerQueryVariables
      >({
        ...options,
        variables: { customerAccessToken: getCustomerToken() },
      })

      if (!customer) {
        return null
      }

      return {
        id: customer.id,
        firstName: customer.firstName ?? 'N/A',
        lastName: customer.lastName ?? '',
        ...(customer.email && { email: customer.email }),
        ...(customer.phone && { phone: customer.phone }),
      }
    }
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

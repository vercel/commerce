import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { getCustomerRoute } from '../utils/token/customer-route'
import { normalizeCustomer } from '../utils/normalize/normalize-customer'
import { getCustomerToken } from '../utils/token/customer-token'
import { CustomerHook } from '@vercel/commerce/types/customer'
import { CUSTOMERS_ENDPOINT } from '../utils/constant/api-endpoints'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: CUSTOMERS_ENDPOINT,
    method: 'GET',
  },
  fetcher: async ({ options, fetch }) => {
    if (getCustomerToken()) {
      const customerData = await fetch({
        url: getCustomerRoute() ?? '',
        method: options.method,
      })
      return normalizeCustomer(customerData?.customer)
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

import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { getCustomerRoute } from '../utils/token/customer-route'
import { normalizeCustomer } from '../utils/normalize/normalize-customer'
import { getCustomerToken } from '../utils/token/customer-token'
import { CustomerHook } from '@vercel/commerce/types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: `/api/v2/shop/customers/`,
    method: 'GET',
  },
  fetcher: async ({ options, fetch }) => {
    if (getCustomerToken()) {
      const syliusCustomer = await fetch({
        url: getCustomerRoute() ?? '',
        method: options.method,
      })
      return normalizeCustomer(syliusCustomer)
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

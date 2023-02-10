import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { getCustomerRoute } from '../utils/token/customer-route'
import { normalizeCustomer } from '../utils/normalize/normalize-customer'
import { CustomerHook } from '@vercel/commerce/types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: `/customers/`,
    method: 'GET',
  },
  fetcher: async ({ options, fetch }) => {
    const syliusCustomer = await fetch({
      url: getCustomerRoute() ?? '',
      method: options.method,
    })
    const customer = normalizeCustomer(syliusCustomer)
    return customer
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

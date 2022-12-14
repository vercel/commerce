import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { getCustomerId } from '../utils/token/customer-id'
import { normalizeCustomer } from '../utils/normalize/normalize-customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    url: `/customers/`,
    method: 'GET',
  },
  fetcher: async ({ options, fetch }) => {
    const syliusCustomer = await fetch({
      url: options.url! + getCustomerId(),
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

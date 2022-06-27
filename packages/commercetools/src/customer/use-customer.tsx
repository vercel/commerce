import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { SWRHook } from '@vercel/commerce/utils/types'
import type { CustomerHook } from '../types/customer'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: '/api/customer',
    method: 'get',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch(options)
    return data?.customer ?? null
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

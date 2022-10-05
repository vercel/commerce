import type { SWRHook } from '@vercel/commerce/utils/types'
import type { CustomerHook } from '@vercel/commerce/types/customer'

import useCustomer, {
  type UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { normalizeCustomer } from '../utils/normalize'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: 'account',
    method: 'get',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
    })
    return data ? normalizeCustomer(data) : null
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

import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { Customer } from '@commerce/types'
import { SWRHook } from '@commerce/utils/types'
import { viewerQuery } from '../utils'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    query: viewerQuery,
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>({
      ...options,
    })
    return data.viewer ?? null
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

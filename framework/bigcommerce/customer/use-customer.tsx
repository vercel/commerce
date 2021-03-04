import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import type { Customer, CustomerData } from '../api/customers'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    url: '/api/bigcommerce/customers',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<CustomerData | null>(options)
    return data?.customer ?? null
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

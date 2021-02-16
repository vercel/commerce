import { HookHandler } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import type { Customer, CustomerData } from '../api/customers'
import type { BigcommerceProvider } from '..'

export default useCustomer as UseCustomer<BigcommerceProvider>

export const handler: HookHandler<Customer | null> = {
  fetchOptions: {
    url: '/api/bigcommerce/customers',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<CustomerData | null>(options)
    return data?.customer ?? null
  },
  useHook({ input, useData }) {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}

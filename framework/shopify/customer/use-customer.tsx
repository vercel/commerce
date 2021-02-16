import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { Customer } from '@commerce/types'
import { HookHandler } from '@commerce/utils/types'
import { getCustomerQuery } from '@framework/utils'
import type { ShopifyProvider } from '..'

export default useCustomer as UseCustomer<ShopifyProvider>

export const handler: HookHandler<Customer | null> = {
  fetchOptions: {
    query: getCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<any | null>(options)
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

import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceCustomer from '@commerce/use-customer'
import type { Customer, CustomerData } from './api/customers'

const defaultOpts = {
  url: '/api/bigcommerce/customers',
  method: 'GET',
}

export type { Customer }

export const fetcher: HookFetcher<Customer | null> = async (
  options,
  _,
  fetch
) => {
  const data = await fetch<CustomerData | null>({ ...defaultOpts, ...options })
  return data?.customer ?? null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<Customer | null>
) {
  const useCustomer = () => {
    return useCommerceCustomer(defaultOpts, [], customFetcher, {
      revalidateOnFocus: false,
      ...swrOptions,
    })
  }

  useCustomer.extend = extendHook

  return useCustomer
}

export default extendHook(fetcher)

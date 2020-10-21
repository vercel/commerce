import { ConfigInterface } from 'swr'
import { HookFetcher } from '@lib/commerce/utils/types'
import useCommerceCustomer, { CustomerInput } from '@lib/commerce/use-customer'
import type { Customer, CustomerData } from './api/customers'

const defaultOpts = {
  url: '/api/bigcommerce/customer',
  method: 'GET',
}

export type { Customer }

export const fetcher: HookFetcher<CustomerData | null, CustomerInput> = (
  options,
  { cartId },
  fetch
) => {
  return cartId ? fetch({ ...defaultOpts, ...options }) : null
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: ConfigInterface
) {
  const useCustomer = () => {
    const cart = useCommerceCustomer<CustomerData | null>(
      defaultOpts,
      [],
      customFetcher,
      { revalidateOnFocus: false, ...swrOptions }
    )

    return cart
  }

  useCustomer.extend = extendHook

  return useCustomer
}

export default extendHook(fetcher)

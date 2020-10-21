import { responseInterface, ConfigInterface } from 'swr'
import Cookies from 'js-cookie'
import type { HookInput, HookFetcher, HookFetcherOptions } from './utils/types'
import useData from './utils/use-data'
import { useCommerce } from '.'

export type CustomerResponse<T> = responseInterface<T, Error>

export type CustomerInput = {
  cartId: string | undefined
}

export default function useCustomer<T>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<T | null, CustomerInput>,
  swrOptions?: ConfigInterface<T | null>
) {
  // TODO: Replace this with the login cookie
  const { cartCookie } = useCommerce()

  const fetcher: typeof fetcherFn = (options, input, fetch) => {
    input.cartId = Cookies.get(cartCookie)
    return fetcherFn(options, input, fetch)
  }

  const response = useData(options, input, fetcher, swrOptions)

  return response as CustomerResponse<T>
}

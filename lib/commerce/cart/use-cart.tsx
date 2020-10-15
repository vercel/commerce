import { responseInterface, ConfigInterface } from 'swr'
import Cookies from 'js-cookie'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import useData from '../utils/use-data'
import { useCommerce } from '..'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

export type CartInput = {
  cartId: string | undefined
}

export default function useCart<T>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<T | null, CartInput>,
  swrOptions?: ConfigInterface<T | null>
) {
  const { cartCookie = '' } = useCommerce() | {}
  const fetcher: typeof fetcherFn = (options, input, fetch) => {
    input.cartId = Cookies.get(cartCookie)
    return fetcherFn(options, input, fetch)
  }
  const response = useData(options, input, fetcher, swrOptions)

  return Object.assign(response, { isEmpty: true }) as CartResponse<T>
}

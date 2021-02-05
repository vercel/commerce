import Cookies from 'js-cookie'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import useData, { ResponseState, SwrOptions } from '../utils/use-data'
import type { Cart } from '../types'
import { useCommerce } from '..'

export type CartResponse<Data> = ResponseState<Data> & { isEmpty?: boolean }

// Input expected by the `useCart` hook
export type CartInput = {
  cartId?: Cart['id']
}

export default function useCart<Data extends Cart | null>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<Data, CartInput>,
  swrOptions?: SwrOptions<Data, CartInput>
): CartResponse<Data> {
  const { providerRef, cartCookie } = useCommerce()
  const fetcher: typeof fetcherFn = (options, input, fetch) => {
    input.cartId = Cookies.get(cartCookie)
    return fetcherFn(options, input, fetch)
  }
  const response = useData(options, input, fetcher, swrOptions)

  return response
}

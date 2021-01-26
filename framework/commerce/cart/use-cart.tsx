import Cookies from 'js-cookie'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import useData, { ResponseState, SwrOptions } from '../utils/use-data'
import { useCommerce } from '..'

export type CartResponse<Data> = ResponseState<Data> & { isEmpty?: boolean }

export type CartInput = {
  cartId?: BaseCart['id']
}

export default function useCart<Data extends BaseCart | null>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<Data, CartInput>,
  swrOptions?: SwrOptions<Data, CartInput>
): CartResponse<Data> {
  const { cartCookie } = useCommerce()
  const fetcher: typeof fetcherFn = (options, input, fetch) => {
    input.cartId = Cookies.get(cartCookie)
    return fetcherFn(options, input, fetch)
  }
  const response = useData(options, input, fetcher, swrOptions)

  return response
}

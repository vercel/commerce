import type { responseInterface } from 'swr'
import Cookies from 'js-cookie'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import useData, { SwrOptions } from '../utils/use-data'
import { useCommerce } from '..'

export type CartResponse<Result> = responseInterface<Result, Error> & {
  isEmpty: boolean
}

export type CartInput = {
  cartId: string | undefined
}

export default function useCart<Result>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<Result, CartInput>,
  swrOptions?: SwrOptions<Result, CartInput>
) {
  const { cartCookie } = useCommerce()

  const fetcher: typeof fetcherFn = (options, input, fetch) => {
    input.cartId = Cookies.get(cartCookie)
    return fetcherFn(options, input, fetch)
  }

  const response = useData(options, input, fetcher, swrOptions)

  return Object.assign(response, { isEmpty: true }) as CartResponse<Result>
}

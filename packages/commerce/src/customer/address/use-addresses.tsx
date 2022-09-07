import type { SWRHook, HookFetcherFn } from '../../utils/types'
import type { GetAddressesHook } from '../../types/customer/address'

import Cookies from 'js-cookie'

import { useHook, useSWRHook } from '../../utils/use-hook'
import { Provider, useCommerce } from '../..'

export type UseAddresses<
  H extends SWRHook<GetAddressesHook> = SWRHook<GetAddressesHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<GetAddressesHook> = async ({
  options,
  input: { cartId },
  fetch,
}) => {
  return cartId ? await fetch(options) : null
}

const fn = (provider: Provider) => provider.customer?.address?.useAddresses!

const useAddresses: UseAddresses = (input) => {
  const hook = useHook(fn)
  const { cartCookie } = useCommerce()
  const fetcherFn = hook.fetcher ?? fetcher
  const wrapper: typeof fetcher = (context) => {
    context.input.cartId = Cookies.get(cartCookie)
    return fetcherFn(context)
  }
  return useSWRHook({ ...hook, fetcher: wrapper })(input)
}

export default useAddresses

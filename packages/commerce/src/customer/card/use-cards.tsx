import type { SWRHook, HookFetcherFn } from '../../utils/types'
import type { GetCardsHook } from '../../types/customer/card'

import Cookies from 'js-cookie'

import { useHook, useSWRHook } from '../../utils/use-hook'
import { Provider, useCommerce } from '../..'

export type UseCards<H extends SWRHook<GetCardsHook> = SWRHook<GetCardsHook>> =
  ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<GetCardsHook> = async ({
  options,
  input: { cartId },
  fetch,
}) => {
  return cartId ? await fetch(options) : null
}

const fn = (provider: Provider) => provider.customer?.card?.useCards!

const useCards: UseCards = (input) => {
  const hook = useHook(fn)
  const { cartCookie } = useCommerce()
  const fetcherFn = hook.fetcher ?? fetcher
  const wrapper: typeof fetcher = (context) => {
    context.input.cartId = Cookies.get(cartCookie)
    return fetcherFn(context)
  }
  return useSWRHook({ ...hook, fetcher: wrapper })(input)
}

export default useCards

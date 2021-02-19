import { useHook, useMutationHook } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { Cart, CartItemBody, AddCartItemBody } from '../types'
import type { Provider } from '..'

export const fetcher: HookFetcherFn<
  Cart,
  AddCartItemBody<CartItemBody>
> = mutationFetcher

export type UseAddItem<
  H extends MutationHook<any, any, any> = MutationHook<Cart, {}, CartItemBody>
> = ReturnType<H['useHook']>

const fn = (provider: Provider) => provider.cart?.useAddItem!

const useAddItem: UseAddItem = (...args) => {
  const hook = useHook(fn)
  return useMutationHook({ fetcher, ...hook })(...args)
}

export default useAddItem

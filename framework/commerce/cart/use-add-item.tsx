import useHook, { useHookHandler } from '../utils/use-hook'
import type { MutationHook, HookFetcherFn } from '../utils/types'
import type { Cart, CartItemBody, AddCartItemBody } from '../types'
import type { Provider } from '..'

export const fetcher: HookFetcherFn<
  Cart,
  AddCartItemBody<CartItemBody>
> = async ({ options, input, fetch }) => {
  return fetch({ ...options, body: input })
}

export type UseAddItem<
  H extends MutationHook<any, any, any> = MutationHook<Cart, {}, CartItemBody>
> = ReturnType<H['useHook']>

const fn = (provider: Provider) => provider.cart?.useAddItem!

const useAddItem: UseAddItem = (...args) => {
  const handler = useHookHandler(fn, fetcher)
  return handler(useHook(fn, fetcher))(...args)
}

export default useAddItem

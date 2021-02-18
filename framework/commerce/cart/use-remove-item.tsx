import useHook, { useHookHandler } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook } from '../utils/types'
import type { Cart, LineItem, RemoveCartItemBody } from '../types'
import type { Provider } from '..'

/**
 * Input expected by the action returned by the `useRemoveItem` hook
 */
export type RemoveItemInput = {
  id: string
}

export type UseRemoveItem<
  H extends MutationHook<any, any, any> = MutationHook<
    Cart | null,
    { item?: LineItem },
    RemoveItemInput,
    RemoveCartItemBody
  >
> = ReturnType<H['useHook']>

export const fetcher = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useRemoveItem!

const useRemoveItem: UseRemoveItem = (input) => {
  const handler = useHookHandler(fn, fetcher)
  return handler(useHook(fn, fetcher))(input)
}

export default useRemoveItem

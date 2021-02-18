import useHook, { useHookHandler } from '../utils/use-hook'
import { mutationFetcher } from '../utils/default-fetcher'
import type { MutationHook } from '../utils/types'
import type { Cart, CartItemBody, LineItem, UpdateCartItemBody } from '../types'
import type { Provider } from '..'

/**
 * Input expected by the action returned by the `useUpdateItem` hook
 */
export type UpdateItemInput<T extends CartItemBody> = T & {
  id: string
}

export type UseUpdateItem<
  H extends MutationHook<any, any, any> = MutationHook<
    Cart | null,
    {
      item?: LineItem
      wait?: number
    },
    UpdateItemInput<CartItemBody>,
    UpdateCartItemBody<CartItemBody>
  >
> = ReturnType<H['useHook']>

export const fetcher = mutationFetcher

const fn = (provider: Provider) => provider.cart?.useUpdateItem!

const useUpdateItem: UseUpdateItem = (input) => {
  const handler = useHookHandler(fn, fetcher)
  return handler(useHook(fn, fetcher))(input)
}

export default useUpdateItem

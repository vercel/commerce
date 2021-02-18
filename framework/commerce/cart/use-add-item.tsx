import { useCallback } from 'react'
import type {
  Prop,
  HookFetcherFn,
  UseHookInput,
  UseHookResponse,
} from '../utils/types'
import type { Cart, CartItemBody, AddCartItemBody } from '../types'
import { Provider, useCommerce } from '..'
import { BigcommerceProvider } from '@framework'

export type UseAddItemHandler<P extends Provider> = Prop<
  Prop<P, 'cart'>,
  'useAddItem'
>

// Input expected by the action returned by the `useAddItem` hook
export type UseAddItemInput<P extends Provider> = UseHookInput<
  UseAddItemHandler<P>
>

export type UseAddItemResult<P extends Provider> = ReturnType<
  UseHookResponse<UseAddItemHandler<P>>
>

export type UseAddItem<P extends Provider, Input> = Partial<
  UseAddItemInput<P>
> extends UseAddItemInput<P>
  ? (input?: UseAddItemInput<P>) => (input: Input) => UseAddItemResult<P>
  : (input: UseAddItemInput<P>) => (input: Input) => UseAddItemResult<P>

export const fetcher: HookFetcherFn<
  Cart,
  AddCartItemBody<CartItemBody>
> = async ({ options, input, fetch }) => {
  return fetch({ ...options, body: input })
}

type X = UseAddItemResult<BigcommerceProvider>

export default function useAddItem<P extends Provider, Input>(
  input: UseAddItemInput<P>
) {
  const { providerRef, fetcherRef } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.cart?.useAddItem

  const fetcherFn = opts?.fetcher ?? fetcher
  const useHook = opts?.useHook ?? (() => () => {})
  const fetchFn = provider.fetcher ?? fetcherRef.current
  const action = useHook({ input })

  return useCallback(
    function addItem(input: Input) {
      return action({
        input,
        fetch({ input }) {
          return fetcherFn({
            input,
            options: opts!.fetchOptions,
            fetch: fetchFn,
          })
        },
      })
    },
    [input, fetchFn, opts?.fetchOptions]
  )
}

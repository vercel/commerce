import { useMemo } from 'react'
import Cookies from 'js-cookie'
import type { Cart } from '../types'
import type { Prop, HookFetcherFn, UseHookInput } from '../utils/types'
import useData from '../utils/use-data-2'
import { Provider, useCommerce } from '..'

export type FetchCartInput = {
  cartId?: Cart['id']
}

export type UseCartHandler<P extends Provider> = Prop<
  Prop<P, 'cart'>,
  'useCart'
>

export type CartResponse<P extends Provider> = ReturnType<
  Prop<UseCartHandler<P>, 'onResponse'>
>

export type UseCartInput<P extends Provider> = UseHookInput<UseCartHandler<P>>

export type UseCart<P extends Provider> = Partial<
  UseCartInput<P>
> extends UseCartInput<P>
  ? (input?: UseCartInput<P>) => CartResponse<P>
  : (input: UseCartInput<P>) => CartResponse<P>

export const fetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  input: { cartId },
  fetch,
  normalize,
}) => {
  const data = cartId ? await fetch({ ...options }) : null
  return data && normalize ? normalize(data) : data
}

type X = UseCartInput<Provider>

export default function useCart<P extends Provider>(
  input: UseCartInput<P> = {}
) {
  const { providerRef, fetcherRef, cartCookie } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.cart?.useCart

  const { swrOptions, ...hookInput } = input

  return opts?.useHook!({
    input: hookInput,
    swrOptions,
    useData(ctx) {
      const fetcherFn = opts?.fetcher ?? fetcher
      const wrapper: typeof fetcher = (context) => {
        context.input.cartId = Cookies.get(cartCookie)
        return fetcherFn(context)
      }
      const response = useData(
        {
          ...opts,
          fetcher: wrapper,
          swrOptions: {
            ...opts.swrOptions,
            ...(ctx?.swrOptions ?? swrOptions),
          },
        },
        ctx?.input ?? [],
        provider.fetcher ?? fetcherRef.current
      )
      return response
    },
  })

  // console.log(i)

  // const fetcherFn = opts?.fetcher ?? fetcher
  // const wrapper: typeof fetcher = (context) => {
  //   context.input.cartId = Cookies.get(cartCookie)
  //   return fetcherFn(context)
  // }
  // const response = useData(
  //   { ...opts, fetcher: wrapper },
  //   opts?.input ? opts.input(input ?? {}) : [],
  //   provider.fetcher ?? fetcherRef.current
  // )
  // const memoizedResponse = useMemo(
  //   () => (opts?.onResponse ? opts.onResponse(response) : response),
  //   [response]
  // )

  // return memoizedResponse as CartResponse<P>
}

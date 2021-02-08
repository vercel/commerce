import { useMemo } from 'react'
import Cookies from 'js-cookie'
import type { Cart } from '../types'
import type { HookFetcherFn } from '../utils/types'
import useData from '../utils/use-data-2'
import { Provider, useCommerce } from '..'

// Input expected by the `useCart` hook
export type CartInput = {
  cartId?: Cart['id']
}

export type CartResponse<P extends Provider> = ReturnType<
  NonNullable<NonNullable<NonNullable<P['cart']>['useCart']>['onResponse']>
>

export type UseCart<P extends Provider> = () => CartResponse<P>

export const fetcher: HookFetcherFn<Cart | null, CartInput> = async ({
  options,
  input: { cartId },
  fetch,
  normalize,
}) => {
  const data = cartId ? await fetch({ ...options }) : null
  return data && normalize ? normalize(data) : data
}

export default function useCart<P extends Provider>() {
  const { providerRef, cartCookie } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.cart?.useCart
  const fetcherFn = opts?.fetcher ?? fetcher
  const wrapper: typeof fetcher = (context) => {
    context.input.cartId = Cookies.get(cartCookie)
    return fetcherFn(context)
  }
  const response = useData(opts!, [], wrapper, opts?.swrOptions)
  const memoizedResponse = useMemo(
    () => (opts?.onResponse ? opts.onResponse(response) : response),
    [response]
  )

  return memoizedResponse as CartResponse<P>
}

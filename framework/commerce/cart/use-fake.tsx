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

const fetcher: HookFetcherFn<Cart | null, CartInput> = async ({
  options,
  input: { cartId },
  fetch,
  normalize,
}) => {
  const data = cartId ? await fetch({ ...options }) : null
  return data && normalize ? normalize(data) : data
}

export default function useFake<P extends Provider>() {
  const { providerRef, cartCookie } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.cart?.useCart
  const options = opts?.fetchOptions ?? {}
  const fetcherFn = opts?.fetcher ?? fetcher
  const wrapper: typeof fetcher = (context) => {
    context.input.cartId = Cookies.get(cartCookie)
    return fetcherFn(context)
  }

  const response = useData(options, [], wrapper, opts?.swrOptions)
  const memoizedResponse = useMemo(
    () => (opts?.onResponse ? opts.onResponse(response) : response),
    [response]
  )

  return memoizedResponse
}

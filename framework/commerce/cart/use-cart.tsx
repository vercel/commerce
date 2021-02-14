import Cookies from 'js-cookie'
import type { Cart } from '../types'
import type {
  Prop,
  HookFetcherFn,
  UseHookInput,
  UseHookResponse,
} from '../utils/types'
import useData from '../utils/use-data'
import { Provider, useCommerce } from '..'

export type FetchCartInput = {
  cartId?: Cart['id']
}

export type UseCartHandler<P extends Provider> = Prop<
  Prop<P, 'cart'>,
  'useCart'
>

export type UseCartInput<P extends Provider> = UseHookInput<UseCartHandler<P>>

export type CartResponse<P extends Provider> = UseHookResponse<
  UseCartHandler<P>
>

export type UseCart<P extends Provider> = Partial<
  UseCartInput<P>
> extends UseCartInput<P>
  ? (input?: UseCartInput<P>) => CartResponse<P>
  : (input: UseCartInput<P>) => CartResponse<P>

export const fetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  input: { cartId },
  fetch,
}) => {
  return cartId ? await fetch({ ...options }) : null
}

export default function useCart<P extends Provider>(
  input: UseCartInput<P> = {}
) {
  const { providerRef, fetcherRef, cartCookie } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.cart?.useCart

  const fetcherFn = opts?.fetcher ?? fetcher
  const useHook = opts?.useHook ?? ((ctx) => ctx.useData())

  const wrapper: typeof fetcher = (context) => {
    context.input.cartId = Cookies.get(cartCookie)
    return fetcherFn(context)
  }

  return useHook({
    input,
    useData(ctx) {
      const response = useData(
        { ...opts!, fetcher: wrapper },
        ctx?.input ?? [],
        provider.fetcher ?? fetcherRef.current,
        ctx?.swrOptions ?? input.swrOptions
      )
      return response
    },
  })
}

import {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'
import { Fetcher, SWRHook, MutationHook } from './utils/types'
import type { FetchCartInput } from './cart/use-cart'
import type { Cart, Wishlist, Customer, SearchProductsData } from './types'

const Commerce = createContext<CommerceContextValue<any> | {}>({})

export type Provider = CommerceConfig & {
  fetcher: Fetcher
  cart?: {
    useCart?: SWRHook<Cart | null, any, FetchCartInput>
    useAddItem?: MutationHook<any, any, any>
    useUpdateItem?: MutationHook<any, any, any>
    useRemoveItem?: MutationHook<any, any, any>
  }
  wishlist?: {
    useWishlist?: SWRHook<Wishlist | null, any, any>
    useAddItem?: MutationHook<any, any, any>
    useRemoveItem?: MutationHook<any, any, any>
  }
  customer?: {
    useCustomer?: SWRHook<Customer | null, any, any>
  }
  products?: {
    useSearch?: SWRHook<SearchProductsData, any, any>
  }
  auth?: {
    useSignup?: MutationHook<any, any, any>
    useLogin?: MutationHook<any, any, any>
    useLogout?: MutationHook<any, any, any>
  }
}

export type CommerceProps<P extends Provider> = {
  children?: ReactNode
  provider: P
  config: CommerceConfig
}

export type CommerceConfig = Omit<
  CommerceContextValue<any>,
  'providerRef' | 'fetcherRef'
>

export type CommerceContextValue<P extends Provider> = {
  providerRef: MutableRefObject<P>
  fetcherRef: MutableRefObject<Fetcher>
  locale: string
  cartCookie: string
}

export function CommerceProvider<P extends Provider>({
  provider,
  children,
  config,
}: CommerceProps<P>) {
  if (!config) {
    throw new Error('CommerceProvider requires a valid config object')
  }

  const providerRef = useRef(provider)
  // TODO: Remove the fetcherRef
  const fetcherRef = useRef(provider.fetcher)
  // Because the config is an object, if the parent re-renders this provider
  // will re-render every consumer unless we memoize the config
  const cfg = useMemo(
    () => ({
      providerRef,
      fetcherRef,
      locale: config.locale,
      cartCookie: config.cartCookie,
    }),
    [config.locale, config.cartCookie]
  )

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>
}

export function useCommerce<P extends Provider>() {
  return useContext(Commerce) as CommerceContextValue<P>
}

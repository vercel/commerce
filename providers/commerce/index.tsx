import {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'

import type {
  Customer,
  Wishlist,
  Cart,
  Product,
  Signup,
  Login,
  Logout,
} from '@commerce/types'

import type { Fetcher, SWRHook, MutationHook } from './utils/types'

const Commerce = createContext<CommerceContextValue<any> | {}>({})

export type Provider = CommerceConfig & {
  fetcher: Fetcher
  cart?: {
    useCart?: SWRHook<Cart.GetCartHook>
    useAddItem?: MutationHook<Cart.AddItemHook>
    useUpdateItem?: MutationHook<Cart.UpdateItemHook>
    useRemoveItem?: MutationHook<Cart.RemoveItemHook>
  }
  wishlist?: {
    useWishlist?: SWRHook<Wishlist.GetWishlistHook>
    useAddItem?: MutationHook<Wishlist.AddItemHook>
    useRemoveItem?: MutationHook<Wishlist.RemoveItemHook>
  }
  customer?: {
    useCustomer?: SWRHook<Customer.CustomerHook>
  }
  products?: {
    useSearch?: SWRHook<Product.SearchProductsHook>
  }
  auth?: {
    useSignup?: MutationHook<Signup.SignupHook>
    useLogin?: MutationHook<Login.LoginHook>
    useLogout?: MutationHook<Logout.LogoutHook>
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

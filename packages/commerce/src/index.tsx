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
  Checkout,
} from './types'

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
  checkout?: {
    useCheckout?: SWRHook<Checkout.GetCheckoutHook>
    useSubmitCheckout?: MutationHook<Checkout.SubmitCheckoutHook>
  }
  wishlist?: {
    useWishlist?: SWRHook<Wishlist.GetWishlistHook>
    useAddItem?: MutationHook<Wishlist.AddItemHook>
    useRemoveItem?: MutationHook<Wishlist.RemoveItemHook>
  }
  customer?: {
    useCustomer?: SWRHook<Customer.CustomerHook>
    card?: {
      useCards?: SWRHook<Customer.Card.GetCardsHook>
      useAddItem?: MutationHook<Customer.Card.AddItemHook>
      useUpdateItem?: MutationHook<Customer.Card.UpdateItemHook>
      useRemoveItem?: MutationHook<Customer.Card.RemoveItemHook>
    }
    address?: {
      useAddresses?: SWRHook<Customer.Address.GetAddressesHook>
      useAddItem?: MutationHook<Customer.Address.AddItemHook>
      useUpdateItem?: MutationHook<Customer.Address.UpdateItemHook>
      useRemoveItem?: MutationHook<Customer.Address.RemoveItemHook>
    }
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

export type CommerceConfig = {
  locale: string
  cartCookie: string
}

export type CommerceContextValue<P extends Provider> = {
  providerRef: MutableRefObject<P>
  fetcherRef: MutableRefObject<Fetcher>
} & CommerceConfig

export type CommerceProps<P extends Provider> = {
  children?: ReactNode
  provider: P
}

/**
 * These are the properties every provider should allow when implementing
 * the core commerce provider
 */
export type CommerceProviderProps = {
  children?: ReactNode
} & Partial<CommerceConfig>

export function CoreCommerceProvider<P extends Provider>({
  provider,
  children,
}: CommerceProps<P>) {
  const providerRef = useRef(provider)
  // TODO: Remove the fetcherRef
  const fetcherRef = useRef(provider.fetcher)
  // If the parent re-renders this provider will re-render every
  // consumer unless we memoize the config
  const { locale, cartCookie } = providerRef.current
  const cfg = useMemo(
    () => ({ providerRef, fetcherRef, locale, cartCookie }),
    [locale, cartCookie]
  )

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>
}

export function getCommerceProvider<P extends Provider>(provider: P) {
  return function CommerceProvider({
    children,
    ...props
  }: CommerceProviderProps) {
    return (
      <CoreCommerceProvider provider={{ ...provider, ...props }}>
        {children}
      </CoreCommerceProvider>
    )
  }
}

export function useCommerce<P extends Provider>() {
  return useContext(Commerce) as CommerceContextValue<P>
}

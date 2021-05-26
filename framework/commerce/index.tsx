import {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'

import type {
  AddItemHook,
  GetCartHook,
  RemoveItemHook,
  UpdateItemHook,
} from '@framework/types/cart'

import {
  AddItemHook as WishlistAddItemHook,
  GetWishlistHook,
  RemoveItemHook as WishlistRemoveItemHook,
} from '@framework/types/wishlist'

import { CustomerHook } from '@framework/types/customer'
import { LoginHook } from '@framework/types/login'
import { LogoutHook } from '@framework/types/logout'
import { SearchProductsHook } from '@framework/types/product'
import { SignupHook } from '@framework/types/signup'

import { Fetcher, SWRHook, MutationHook } from './utils/types'

const Commerce = createContext<CommerceContextValue<any> | {}>({})

export type Provider = CommerceConfig & {
  fetcher: Fetcher
  cart?: {
    useCart?: SWRHook<GetCartHook>
    useAddItem?: MutationHook<AddItemHook>
    useUpdateItem?: MutationHook<UpdateItemHook>
    useRemoveItem?: MutationHook<RemoveItemHook>
  }
  wishlist?: {
    useWishlist?: SWRHook<GetWishlistHook>
    useAddItem?: MutationHook<WishlistAddItemHook>
    useRemoveItem?: MutationHook<WishlistRemoveItemHook>
  }
  customer?: {
    useCustomer?: SWRHook<CustomerHook>
  }
  products?: {
    useSearch?: SWRHook<SearchProductsHook>
  }
  auth?: {
    useSignup?: MutationHook<SignupHook>
    useLogin?: MutationHook<LoginHook>
    useLogout?: MutationHook<LogoutHook>
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

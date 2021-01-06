import {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'
import * as React from 'react'
import { Fetcher } from './utils/types'

const Commerce = createContext<CommerceContextValue | {}>({})

export type CommerceProps = {
  children?: ReactNode
  config: CommerceConfig
}

export type CommerceConfig = { fetcher: Fetcher<any> } & Omit<
  CommerceContextValue,
  'fetcherRef'
>

export type CommerceContextValue = {
  fetcherRef: MutableRefObject<Fetcher<any>>
  locale: string
  cartCookie: string
}

export function CommerceProvider({ children, config }: CommerceProps) {
  if (!config) {
    throw new Error('CommerceProvider requires a valid config object')
  }

  const fetcherRef = useRef(config.fetcher)
  // Because the config is an object, if the parent re-renders this provider
  // will re-render every consumer unless we memoize the config
  const cfg = useMemo(
    () => ({
      fetcherRef,
      locale: config.locale,
      cartCookie: config.cartCookie,
    }),
    [config.locale, config.cartCookie]
  )

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>
}

export function useCommerce<T extends CommerceContextValue>() {
  return useContext(Commerce) as T
}

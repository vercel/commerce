import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import useSWR from 'swr'

const Commerce = createContext<CommerceConfig | null>(null)

export type CommerceProps = {
  children?: ReactNode
  config: CommerceConfig
}

export type CommerceConfig = {
  fetcher: Fetcher<any>
  locale: string
  cartCookie: string
}

export type Fetcher<T> = (options: FetcherOptions) => T | Promise<T>

export type FetcherOptions = {
  url?: string
  query?: string
  method?: string
  variables?: any
  body?: any
}

export function CommerceProvider({ children, config }: CommerceProps) {
  if (!config) {
    throw new Error('CommerceProvider requires a valid config object')
  }

  // Because the config is an object, if the parent re-renders this provider
  // will re-render every consumer unless we memoize the config
  const cfg = useMemo(
    () => ({
      fetcher: config.fetcher,
      locale: config.locale,
      cartCookie: config.cartCookie,
    }),
    // Even though the fetcher is a function, it's never expected to be
    // added dynamically (We should say that on the docs for this hook)
    [config.fetcher, config.locale, config.cartCookie]
  )

  return <Commerce.Provider value={cfg}>{children}</Commerce.Provider>
}

export function useCommerce<T extends CommerceConfig>() {
  return useContext(Commerce) as T
}

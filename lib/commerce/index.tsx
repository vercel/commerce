import {
  ReactNode,
  MutableRefObject,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react'

const Commerce = createContext<CommerceConfig | null>(null)

export type CommerceProps = {
  children?: ReactNode
  config: { fetcher: Fetcher<any> } & CommerceConfig
}

export type CommerceConfig = {
  fetcherRef: MutableRefObject<any>
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

export function useCommerce<T extends CommerceConfig>() {
  return useContext(Commerce) as T
}

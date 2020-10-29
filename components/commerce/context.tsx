import React, { ReactNode, FC, useRef, useMemo, MutableRefObject } from 'react'
import { Fetcher } from './types'

export interface State {
  fetcherRef: MutableRefObject<Fetcher<any>>
  locale: string
  cartCookie: string
}

export type CommerceProps = {
  children: ReactNode
  config: CommerceConfig
}

export type CommerceConfig = { fetcher: Fetcher<any> } & Omit<
  State,
  'fetcherRef'
>

const initialState = {}

export const CommerceContext = React.createContext<State | any>(initialState)
CommerceContext.displayName = 'CommerceContext'

export const CommerceProvider: FC<CommerceProps> = ({ children, config }) => {
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

  return (
    <CommerceContext.Provider value={cfg}>{children}</CommerceContext.Provider>
  )
}

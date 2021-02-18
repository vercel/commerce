import { useCallback } from 'react'
import type { MutationHook } from './types'
import { Provider, useCommerce } from '..'

export function useHookHandler<P extends Provider>(
  fn: (provider: P) => MutationHook<any, any, any>,
  fetcher: any
) {
  const { providerRef } = useCommerce<P>()
  const provider = providerRef.current
  const opts = fn(provider)
  const handler =
    opts.useHook ??
    (() => {
      const { fetch } = useHook(fn, fetcher)
      return (input: any) => fetch({ input })
    })

  return handler
}

export default function useHook<P extends Provider>(
  fn: (provider: P) => MutationHook<any, any, any>,
  fetcher: any
) {
  const { providerRef, fetcherRef } = useCommerce<P>()
  const provider = providerRef.current
  const opts = fn(provider)
  const fetcherFn = opts.fetcher ?? fetcher
  const fetchFn = provider.fetcher ?? fetcherRef.current
  const fetch = useCallback(
    ({ input }: { input: any }) => {
      return fetcherFn({
        input,
        options: opts.fetchOptions,
        fetch: fetchFn,
      })
    },
    [fetchFn, opts.fetchOptions]
  )

  return { fetch }
}

import { useCallback } from 'react'
import type { HookFetcher, HookFetcherOptions } from './types'
import { useCommerce } from '..'

export default function useAction<T, Input>(
  options: HookFetcherOptions,
  fetcher: HookFetcher<T, Input>
) {
  const { fetcherRef } = useCommerce()

  return useCallback(
    function addItem(input: Input) {
      return fetcher(options, input, fetcherRef.current)
    },
    [fetcher]
  )
}

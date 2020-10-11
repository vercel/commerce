import { useCallback } from 'react'
import type { HookFetcher, HookFetcherOptions } from '../utils/types'
import { useCommerce } from '..'

export default function useRemoveItem<T, Input>(
  options: HookFetcherOptions,
  fetcher: HookFetcher<T, Input>
) {
  const { fetcherRef } = useCommerce()

  return useCallback(
    function removeItem(input: Input) {
      return fetcher(options, input, fetcherRef.current)
    },
    [fetcher]
  )
}

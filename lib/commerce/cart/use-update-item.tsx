import { useCallback } from 'react'
import { HookFetcher, HookFetcherOptions } from '../utils/types'
import { useCommerce } from '..'

export default function useUpdateItem<T, Input>(
  options: HookFetcherOptions,
  fetcher: HookFetcher<T, Input>
) {
  const { fetcherRef } = useCommerce()

  return useCallback(
    function updateItem(input: Input) {
      return fetcher(options, input, fetcherRef.current)
    },
    [fetcher]
  )
}

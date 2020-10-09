import { useCallback } from 'react'
import { Fetcher, useCommerce } from '..'

export default function useRemoveItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcherRef } = useCommerce()

  return useCallback(
    function removeItem(input: Input) {
      return fetcher(fetcherRef.current, input)
    },
    [fetcher]
  )
}

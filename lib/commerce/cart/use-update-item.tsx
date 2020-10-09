import { useCallback } from 'react'
import { Fetcher, useCommerce } from '..'

export default function useUpdateItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcherRef } = useCommerce()

  return useCallback(
    function updateItem(input: Input) {
      return fetcher(fetcherRef.current, input)
    },
    [fetcher]
  )
}

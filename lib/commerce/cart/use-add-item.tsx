import { useCallback } from 'react'
import { Fetcher, useCommerce } from '..'

export default function useAddItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcherRef } = useCommerce()

  return useCallback(
    function addItem(input: Input) {
      return fetcher(fetcherRef.current, input)
    },
    [fetcher]
  )
}

import { Fetcher, useCommerce } from '..'

export default function useRemoveItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcher: fetch } = useCommerce()

  return async function removeItem(input: Input) {
    return fetcher(fetch, input)
  }
}

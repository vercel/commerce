import { Fetcher, useCommerce } from '..'

export default function useUpdateItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcher: fetch } = useCommerce()

  return async function updateItem(input: Input) {
    return fetcher(fetch, input)
  }
}

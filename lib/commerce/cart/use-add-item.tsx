import { Fetcher, useCommerce } from '..'

export default function useAddItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcher: fetch } = useCommerce()

  return async function addItem(input: Input) {
    return fetcher(fetch, input)
  }
}

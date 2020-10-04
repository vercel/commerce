import { Fetcher, useCommerce } from '..'

export default function useAddItem<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const { fetcher: fetch } = useCommerce()

  return async function addItem(input: Input) {
    const data = fetcher(fetch, input)

    // TODO: Using the state of the cart provider, update the saved cart
    // return mutate('/api/cart')

    return data
  }
}

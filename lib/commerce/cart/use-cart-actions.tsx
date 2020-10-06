import type { Fetcher } from '..'
import useAddItem from './use-add-item'
import useRemoveItem from './use-remove-item'
import useUpdateItem from './use-update-item'

// This hook is probably not going to be used, but it's here
// to show how a commerce should be structuring it
export default function useCartActions<T, Input>(
  fetcher: (fetch: Fetcher<T>, input: Input) => T | Promise<T>
) {
  const addItem = useAddItem<T, Input>(fetcher)
  const updateItem = useUpdateItem<T, Input>(fetcher)
  const removeItem = useRemoveItem<T, Input>(fetcher)

  return { addItem, updateItem, removeItem }
}

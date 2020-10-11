import type { HookFetcher, HookFetcherOptions } from '../utils/types'
import useAddItem from './use-add-item'
import useRemoveItem from './use-remove-item'
import useUpdateItem from './use-update-item'

// This hook is probably not going to be used, but it's here
// to show how a commerce should be structuring it
export default function useCartActions<T, Input>(
  options: HookFetcherOptions,
  fetcher: HookFetcher<T, Input>
) {
  const addItem = useAddItem<T, Input>(options, fetcher)
  const updateItem = useUpdateItem<T, Input>(options, fetcher)
  const removeItem = useRemoveItem<T, Input>(options, fetcher)

  return { addItem, updateItem, removeItem }
}

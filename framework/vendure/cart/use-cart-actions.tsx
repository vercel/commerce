import useAddItem from './use-add-item'
import useRemoveItem from './use-remove-item'
import useUpdateItem from './use-update-item'

// This hook is probably not going to be used, but it's here
// to show how a commerce should be structuring it
export default function useCartActions() {
  const addItem = useAddItem()
  const updateItem = useUpdateItem()
  const removeItem = useRemoveItem()

  return { addItem, updateItem, removeItem }
}

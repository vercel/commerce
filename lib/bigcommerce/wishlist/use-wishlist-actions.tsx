import useAddItem from './use-add-item'
import useRemoveItem from './use-remove-item'

// This hook is probably not going to be used, but it's here
// to show how a commerce should be structuring it
export default function useWishlistActions(wishlistId: string) {
  const addItem = useAddItem(wishlistId)
  const removeItem = useRemoveItem(wishlistId)

  return { addItem, removeItem }
}

import { MutationHook } from '@commerce/utils/types'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ fetch }) =>
    () => {
      return async function addItem() {
        return {}
      }
    },
}

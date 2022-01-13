import useAddItem, { UseAddItem } from '@commerce/customer/card/use-add-item'
import { MutationHook } from '@commerce/utils/types'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ fetch }) =>
    () =>
    async () => ({}),
}

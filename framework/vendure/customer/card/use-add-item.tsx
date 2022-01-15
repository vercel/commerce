import useAddItem, {
  UseAddItem,
} from '@vercel/commerce/customer/card/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'

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

import { MutationHook } from '@vercel/commerce/utils/types'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/customer/address/use-update-item'

export default useUpdateItem as UseUpdateItem<typeof handler>

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

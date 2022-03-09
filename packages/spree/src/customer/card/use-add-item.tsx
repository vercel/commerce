import useAddItem from '@vercel/commerce/customer/address/use-add-item'
import type { UseAddItem } from '@vercel/commerce/customer/address/use-add-item'
import type { MutationHook } from '@vercel/commerce/utils/types'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<any> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    // TODO: Revise url and query
    url: 'checkout',
    query: 'addPayment',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ fetch }) =>
    () =>
    async () => ({}),
}

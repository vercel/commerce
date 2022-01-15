import { SWRHook } from '@vercel/commerce/utils/types'
import useCheckout, {
  UseCheckout,
} from '@vercel/commerce/checkout/use-checkout'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<any> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    // TODO: Revise url and query
    url: 'checkout',
    query: 'show',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ useData }) =>
    async (input) => ({}),
}

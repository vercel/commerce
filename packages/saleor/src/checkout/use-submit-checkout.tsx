import { MutationHook } from '@vercel/commerce/utils/types'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

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

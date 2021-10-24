import type { MutationHook } from '@commerce/utils/types'

import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@commerce/checkout/use-submit-checkout'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ fetch }) =>
    () => {
      return async function onSubmitCheckout() {
        return {}
      }
    },
}

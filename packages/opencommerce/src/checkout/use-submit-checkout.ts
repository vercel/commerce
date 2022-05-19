import { useCallback } from 'react'

import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<SubmitCheckoutHook> = {
  fetchOptions: {
    url: '/api/checkout',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    const data = await fetch({
      ...options,
      body: { item },
    })
    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      return useCallback(async function onSubmitCheckout(input) {
        const data = await fetch({
          input,
        })
        return data
      }, [])
    },
}

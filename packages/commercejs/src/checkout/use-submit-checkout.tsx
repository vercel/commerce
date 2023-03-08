import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import type { MutationHook } from '@vercel/commerce/utils/types'

import { useCallback } from 'react'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'
import { useCheckoutContext } from '@components/checkout/context'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<SubmitCheckoutHook> = {
  fetchOptions: {
    url: '/api/commerce/checkout',
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
      const { cardFields, addressFields } = useCheckoutContext()

      return useCallback(
        async function onSubmitCheckout(input) {
          const data = await fetch({
            input: { card: cardFields, address: addressFields },
          })
          return data
        },
        [cardFields, addressFields]
      )
    },
}

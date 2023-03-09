import { useCallback } from 'react'

import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import { useCheckoutContext } from '@components/checkout/context'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'

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
      const { addressFields } = useCheckoutContext()

      return useCallback(async function onSubmitCheckout(input) {
        const data = await fetch({
          // dummy data here since OC does not need card data for example payment method
          input: {
            ...input,
            card: {
              cardHolder: 'Open Commerce',
              cardCvc: '123',
              cardExpireDate: '03/30',
              cardNumber: '123456789',
              ...addressFields,
            },
          },
        })
        return data
      }, [])
    },
}

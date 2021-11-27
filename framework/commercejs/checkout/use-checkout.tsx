import type { GetCheckoutHook } from '@commerce/types/checkout'

import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useCheckout, { UseCheckout } from '@commerce/checkout/use-checkout'
import useSubmitCheckout from './use-submit-checkout'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<GetCheckoutHook> = {
  fetchOptions: {
    query: '_',
    method: '_',
  },
  useHook: () =>
    function useHook() {
      const submit = useSubmitCheckout()

      // TODO - see https://github.com/vercel/commerce/issues/583.
      // Force card/address to be true so that "confirm purchase" button is enabled.
      const hasEnteredCard = true
      const hasEnteredAddress = true

      const response = useMemo(
        () => ({
          data: {
            hasPayment: hasEnteredCard,
            hasShipping: hasEnteredAddress,
          },
        }),
        [hasEnteredCard, hasEnteredAddress]
      )

      return useMemo(
        () =>
          Object.create(response, {
            submit: {
              get() {
                return submit
              },
              enumerable: true,
            },
          }),
        [submit, response]
      )
    },
}

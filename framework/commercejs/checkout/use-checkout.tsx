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
    function useHook(input) {
      const submit = useSubmitCheckout()

      // Could perform some validation here, currently just checking that some fields exist.
      const response = useMemo(
        () => ({
          data: {
            hasPayment: Object.keys(input?.checkout?.cardFields).length > 0,
            hasShipping: Object.keys(input?.checkout?.addressFields).length > 0,
          },
        }),
        [input]
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

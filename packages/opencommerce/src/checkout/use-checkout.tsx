import type { GetCheckoutHook } from '@vercel/commerce/types/checkout'

import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCheckout, {
  UseCheckout,
} from '@vercel/commerce/checkout/use-checkout'
import useSubmitCheckout from './use-submit-checkout'
import { useCheckoutContext } from '@components/checkout/context'
import { useCart } from '../cart'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<GetCheckoutHook> = {
  fetchOptions: {
    query: '',
    method: '',
  },
  useHook: () =>
    function useHook() {
      const { data: cart } = useCart()
      const hasShippingMethods = !!(
        cart?.checkout?.fulfillmentGroups &&
        cart.checkout.fulfillmentGroups.find(
          (group) => group?.type === 'shipping'
        )
      )

      const { cardFields, addressFields } = useCheckoutContext()

      const { shippingMethod, ...restAddressFields } = addressFields

      // Basic validation - check that at least one field has a value.
      const hasEnteredCard = Object.values(cardFields).some(
        (fieldValue) => !!fieldValue
      )
      const hasEnteredAddress = Object.values(restAddressFields).some(
        (fieldValue) => !!fieldValue
      )

      const response = useMemo(
        () => ({
          data: {
            hasPayment: hasEnteredCard,
            hasShipping: hasEnteredAddress,
            hasShippingMethods,
            hasSelectedShippingMethod: !!shippingMethod?.id,
          },
        }),
        [hasEnteredCard, hasEnteredAddress]
      )

      return useMemo(
        () =>
          Object.create(response, {
            submit: {
              get() {
                return useSubmitCheckout
              },
              enumerable: true,
            },
          }),
        [response, useSubmitCheckout]
      )
    },
}

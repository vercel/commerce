import type { GetCheckoutHook } from '@vercel/commerce/types/checkout'

import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCheckout, {
  UseCheckout,
} from '@vercel/commerce/checkout/use-checkout'
import useSubmitCheckout from './use-submit-checkout'
import { useCheckoutContext } from '@components/checkout/context'
import { AddressFields } from '../types/customer/address'
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
      const shippingTypeMethod =
        cart?.checkout?.fulfillmentGroups &&
        cart.checkout.fulfillmentGroups.find(
          (group) => group?.type === 'shipping'
        )
      const hasShippingMethods =
        !!shippingTypeMethod?.availableFulfillmentOptions?.length

      const { addressFields } = useCheckoutContext()

      const { shippingMethod, ...restAddressFields } =
        addressFields as AddressFields

      const hasEnteredAddress = Object.values(restAddressFields).some(
        (fieldValue) => !!fieldValue
      )

      const response = useMemo(
        () => ({
          data: {
            // example payment plugin does not need payment info
            hasPayment: true,
            hasShipping: hasEnteredAddress,
            hasShippingMethods,
            hasSelectedShippingMethod: !!shippingMethod?.id,
          },
        }),
        [hasEnteredAddress, hasShippingMethods, shippingMethod]
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

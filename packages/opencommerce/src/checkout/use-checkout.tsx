import { useMemo } from 'react'
import Cookies from 'js-cookie'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCheckout, {
  UseCheckout,
} from '@vercel/commerce/checkout/use-checkout'
import useSubmitCheckout from './use-submit-checkout'
import { useCheckoutContext } from '@components/checkout/context'
import { AddressFields } from '../types/customer/address'
import { GetCheckoutHook } from '../types/checkout'
import { FulfillmentGroup } from '../types/cart'
import { API_URL, OPENCOMMERCE_ANONYMOUS_CART_TOKEN_COOKIE } from '../const'
import getAnonymousCartQuery from '../api/queries/get-anonymous-cart'
import { normalizeCheckout } from '../utils/normalize'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<GetCheckoutHook> = {
  fetchOptions: {
    query: getAnonymousCartQuery,
    url: API_URL,
  },
  async fetcher({ options, fetch, input: { cartId } }) {
    const cartToken = Cookies.get(OPENCOMMERCE_ANONYMOUS_CART_TOKEN_COOKIE)

    if (cartId && cartToken) {
      const { cart: rawAnonymousCart } = await fetch({
        ...options,
        variables: {
          cartId,
          cartToken: cartToken,
        },
      })

      if (!rawAnonymousCart?.checkout) return null

      const checkout = normalizeCheckout(rawAnonymousCart.checkout)

      const shippingTypeFulfillment = checkout.fulfillmentGroups.find(
        (group) => group.type === 'shipping'
      )

      const hasShippingMethods =
        !!shippingTypeFulfillment?.availableFulfillmentOptions?.length

      const shippingGroup = checkout.fulfillmentGroups.find(
        (group: FulfillmentGroup) => group?.type === 'shipping'
      )

      const totalDisplayAmount =
        checkout.summary.fulfillmentTotal?.displayAmount || '0'

      return {
        hasPayment: true,
        hasShippingMethods,
        shippingGroup,
        hasShipping: false,
        addressId: 'addressId',
        totalDisplayAmount,
      }
    }

    return null
  },
  useHook: ({ useData }) =>
    function useHook(input) {
      const submit = useSubmitCheckout()
      const { addressFields } = useCheckoutContext()

      const { shippingMethodId, ...restAddressFields } =
        addressFields as AddressFields

      const hasEnteredAddress = Object.values(restAddressFields).some(
        (fieldValue) => !!fieldValue
      )

      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })

      return useMemo(() => {
        if (response.data) {
          return {
            ...response,
            data: {
              ...response.data,
              hasShipping: hasEnteredAddress,
              hasSelectedShippingMethod: !!shippingMethodId,
            },
            submit: () => submit,
            isEmpty: response.data.lineItems?.length ?? 0,
          }
        }

        return Object.create(response, {
          isEmpty: {
            get() {
              return response.data?.lineItems?.length ?? 0
            },
            enumerable: true,
          },
          submit: {
            get() {
              return submit
            },
            enumerable: true,
          },
        })
      }, [response, submit, hasEnteredAddress, shippingMethodId])
    },
}

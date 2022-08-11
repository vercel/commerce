import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'
import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import { CommerceError } from '@vercel/commerce/utils/errors'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import {
  AddPaymentToOrderMutation,
  EligiblePaymentMethodsQuery,
  TransitionOrderToStateMutation,
} from '../../schema'
import { addPaymentToOrder } from '../utils/mutations/add-payment-to-order'
import { transitionOrderToState } from '../utils/mutations/transition-order-to-state'
import { eligiblePaymentMethods } from '../utils/queries/eligible-payment-methods'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<SubmitCheckoutHook> = {
  fetchOptions: {
    query: addPaymentToOrder,
  },
  async fetcher({ input: item, options, fetch }) {
    const transitionResponse = await fetch<TransitionOrderToStateMutation>({
      ...options,
      query: transitionOrderToState,
      variables: {
        state: 'ArrangingPayment',
      },
    })
    if (
      transitionResponse.transitionOrderToState?.__typename ===
      'OrderStateTransitionError'
    ) {
      throw new CommerceError({
        code: transitionResponse.transitionOrderToState.errorCode,
        message: transitionResponse.transitionOrderToState.message,
      })
    } else {
      const paymentMethodsResponse = await fetch<EligiblePaymentMethodsQuery>({
        ...options,
        query: eligiblePaymentMethods,
      })

      const paymentMethodCode =
        paymentMethodsResponse?.eligiblePaymentMethods?.[0]?.code

      if (!paymentMethodCode) {
        throw new CommerceError({
          message: 'No Eligible payment methods',
        })
      }
      const paymentResponse = await fetch<AddPaymentToOrderMutation>({
        ...options,
        variables: {
          input: {
            method: paymentMethodCode,
            metadata: {
              // TODO: Payment provider's token should go in here
            },
          },
        },
      })
      const addPaymentToOrderResultType =
        paymentResponse.addPaymentToOrder.__typename
      if (addPaymentToOrderResultType === 'Order') {
        return {
          hasPayment: true,
          hasShipping: true,
        }
      } else if (
        addPaymentToOrderResultType === 'IneligiblePaymentMethodError' ||
        addPaymentToOrderResultType === 'NoActiveOrderError' ||
        addPaymentToOrderResultType === 'OrderPaymentStateError' ||
        addPaymentToOrderResultType === 'OrderStateTransitionError' ||
        addPaymentToOrderResultType === 'PaymentDeclinedError' ||
        addPaymentToOrderResultType === 'PaymentFailedError'
      ) {
        throw new CommerceError(paymentResponse.addPaymentToOrder as any)
      } else {
        throw new CommerceError({
          message: 'Something went wrong with Payment request',
        })
      }
    }
  },
  useHook: ({ fetch }) =>
    function useHook() {
      return useCallback(
        async function onSubmitCheckout(input) {
          const data = await fetch({ input })

          return data
        },
        [fetch]
      )
    },
}

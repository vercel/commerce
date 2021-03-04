import { Cart } from '../types'
import { CommerceError } from '@commerce/utils/errors'

import {
  CheckoutLineItemsAddPayload,
  CheckoutLineItemsRemovePayload,
  CheckoutLineItemsUpdatePayload,
  CheckoutCreatePayload,
  CheckoutUserError,
  Checkout,
  Maybe,
} from '../schema'

import { normalizeCart } from './normalize'
import throwUserErrors from './throw-user-errors'

export type CheckoutQuery = {
  checkout: Checkout
  checkoutUserErrors?: Array<CheckoutUserError>
}

export type CheckoutPayload =
  | CheckoutLineItemsAddPayload
  | CheckoutLineItemsUpdatePayload
  | CheckoutLineItemsRemovePayload
  | CheckoutCreatePayload
  | CheckoutQuery

const checkoutToCart = (checkoutPayload?: Maybe<CheckoutPayload>): Cart => {
  if (!checkoutPayload) {
    throw new CommerceError({
      message: 'Missing checkout payload from response',
    })
  }

  const checkout = checkoutPayload?.checkout
  throwUserErrors(checkoutPayload?.checkoutUserErrors)

  if (!checkout) {
    throw new CommerceError({
      message: 'Missing checkout object from response',
    })
  }

  return normalizeCart(checkout)
}

export default checkoutToCart

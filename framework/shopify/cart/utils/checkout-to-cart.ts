import { Cart } from '@commerce/types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'

import {
  CheckoutLineItemsAddPayload,
  CheckoutLineItemsUpdatePayload,
  Maybe,
} from '@framework/schema'
import { normalizeCart } from '@framework/utils'

export type CheckoutPayload =
  | CheckoutLineItemsAddPayload
  | CheckoutLineItemsUpdatePayload

const checkoutToCart = (checkoutPayload?: Maybe<CheckoutPayload>): Cart => {
  if (!checkoutPayload || !checkoutPayload?.checkout) {
    throw new CommerceError({
      message: 'Invalid response from Shopify',
    })
  }

  const checkout = checkoutPayload?.checkout
  const userErrors = checkoutPayload?.userErrors

  if (userErrors && userErrors.length) {
    throw new ValidationError({
      message: userErrors[0].message,
    })
  }

  return normalizeCart(checkout)
}

export default checkoutToCart

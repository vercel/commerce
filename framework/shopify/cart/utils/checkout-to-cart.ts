import { Cart } from '../../types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'

import {
  CheckoutLineItemsAddPayload,
  CheckoutLineItemsRemovePayload,
  CheckoutLineItemsUpdatePayload,
  CheckoutCreatePayload,
  Checkout,
  UserError,
} from '../../schema'
import { normalizeCart } from '../../utils'
import { Maybe } from 'framework/bigcommerce/schema'

export type CheckoutQuery = {
  checkout: Checkout
  userErrors?: Array<UserError>
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

  if (!checkout) {
    throw new CommerceError({
      message: 'Invalid response from Shopify',
    })
  }

  return normalizeCart(checkout)
}

export default checkoutToCart

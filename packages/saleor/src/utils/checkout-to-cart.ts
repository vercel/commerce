import { Cart } from '../types'
import { CommerceError } from '@vercel/commerce/utils/errors'

import {
  CheckoutLinesAdd,
  CheckoutLinesUpdate,
  CheckoutCreate,
  CheckoutError,
  Checkout,
  Maybe,
  CheckoutLineDelete,
} from '../../schema'

import { normalizeCart } from './normalize'
import throwUserErrors from './throw-user-errors'

export type CheckoutQuery = {
  checkout: Checkout
  errors?: Array<CheckoutError>
}

export type CheckoutPayload =
  | CheckoutLinesAdd
  | CheckoutLinesUpdate
  | CheckoutCreate
  | CheckoutQuery
  | CheckoutLineDelete

const checkoutToCart = (checkoutPayload?: Maybe<CheckoutPayload>): Cart => {
  if (!checkoutPayload) {
    throw new CommerceError({
      message: 'Missing checkout payload from response',
    })
  }

  const checkout = checkoutPayload?.checkout
  throwUserErrors(checkoutPayload?.errors)

  if (!checkout) {
    throw new CommerceError({
      message: 'Missing checkout object from response',
    })
  }

  return normalizeCart(checkout)
}

export default checkoutToCart

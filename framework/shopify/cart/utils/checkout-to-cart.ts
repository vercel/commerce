import { Cart } from '@commerce/types'
import { ValidationError } from '@commerce/utils/errors'
import { normalizeCart } from '@framework/utils/normalize'
import { Checkout, UserError } from '@framework/schema'

const checkoutToCart = (checkoutResponse: {
  checkout: Checkout
  userErrors?: UserError[]
}): Cart => {
  const checkout = checkoutResponse?.checkout
  const userErrors = checkoutResponse?.userErrors

  if (userErrors && userErrors.length) {
    throw new ValidationError({
      message: userErrors[0].message,
    })
  }

  return normalizeCart(checkout)
}

export default checkoutToCart

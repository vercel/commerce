import {
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  REACTION_COOKIE_EXPIRE,
} from '../../const'
import createCartMutation from '../../utils/mutations/create-cart'
import Cookies from 'js-cookie'

export const createCart = async (fetch: any) => {
  const data = await fetch({
    query: createCartMutation,
    variables: {
      input: {
        shopId,
      },
    },
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: REACTION_COOKIE_EXPIRE,
    }
    Cookies.set(REACTION_ANONYMOUS_CART_TOKEN_COOKIE, checkoutId, options)
  }

  return checkout
}

export default createCart

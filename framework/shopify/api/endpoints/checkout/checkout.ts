import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '../../../const'
import associateCustomerWithCheckoutMutation from '../../../utils/mutations/associate-customer-with-checkout'
import type { CheckoutEndpoint } from '.'

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({
  req,
  res,
  config,
}) => {
  const { cookies } = req
  const checkoutUrl = cookies[SHOPIFY_CHECKOUT_URL_COOKIE]
  const customerCookie = cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE]

  if (customerCookie) {
    try {
      await config.fetch(associateCustomerWithCheckoutMutation, {
        variables: {
          checkoutId: cookies[SHOPIFY_CHECKOUT_ID_COOKIE],
          customerAccessToken: cookies[SHOPIFY_CUSTOMER_TOKEN_COOKIE],
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}

export default checkout

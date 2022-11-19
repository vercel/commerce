import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '../../../const'
import associateCustomerWithCheckoutMutation from '../../../utils/mutations/associate-customer-with-checkout'
import type { CheckoutEndpoint } from '.'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  config,
}) => {
  const { cookies } = req
  const checkoutUrl = cookies.get(SHOPIFY_CHECKOUT_URL_COOKIE)
  const customerCookie = cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)

  if (customerCookie) {
    try {
      await config.fetch(associateCustomerWithCheckoutMutation, {
        variables: {
          checkoutId: cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE),
          customerAccessToken: cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE),
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return { redirectTo: checkoutUrl ?? '/cart' }
}

export default getCheckout

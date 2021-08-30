import type { CheckoutEndpoint } from '.'
import getCredentials from '@framework/api/utils/getCredentials'
import { Order } from '@commercelayer/js-sdk'

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({
  res,
}) => {
  const id = localStorage.getItem('CL_ORDER') || ''
  const credentials = getCredentials()
  if (id && credentials.accessToken) {
    const clOrder = await Order.withCredentials(credentials)
      .includes('lineItems')
      .find(id, { rawResponse: true })
    const checkoutUrl = clOrder.data.attributes.checkout_url
    console.log(checkoutUrl)

    if (checkoutUrl) {
        res.redirect(checkoutUrl)
      } else {
        res.redirect('/cart')
      }
  }
}

export default checkout

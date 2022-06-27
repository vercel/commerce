import { CommerceAPI, createEndpoint, GetAPISchema } from '@vercel/commerce/api'
import { CheckoutSchema } from '@vercel/commerce/types/checkout'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  res,
  config,
}) => {
  const checkoutUrl = ''

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}
export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

export type CheckoutAPI = GetAPISchema<CommerceAPI, CheckoutSchema>
export type CheckoutEndpoint = CheckoutAPI['endpoint']

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi

import type { CheckoutEndpoint } from '.'
import { Handler } from '../cart'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req: request,
  res: response,
  body: { cartId },
  config: { storeDomain, cartTokenCookie },
}: Handler) => {
  const cartToken = request.cookies[cartTokenCookie]

  if (!cartId || !cartToken) {
    response.redirect('/')
    return
  }

  response.redirect(`https://${storeDomain}/checkout/${cartToken}`)
}

export default getCheckout

import type { CheckoutEndpoint } from '.'
import getCustomerId from '../../utils/get-customer-id'
import jwt from 'jsonwebtoken'
import { uuid } from 'uuidv4'

const fullCheckout = true

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  res,
  config,
}) => {
  const { cookies } = req
  const cartId = cookies[config.cartCookie]
  const customerToken = cookies[config.customerCookie]
  if (!cartId) {
    res.redirect('/cart')
    return
  }
  const { data } = await config.storeApiFetch(
    `/v3/carts/${cartId}/redirect_urls`,
    {
      method: 'POST',
    }
  )
  const customerId =
    customerToken && (await getCustomerId({ customerToken, config }))

  //if there is a customer create a jwt token
  if (!customerId) {
    if (fullCheckout) {
      res.redirect(data.checkout_url)
      return
    }
  } else {
    const dateCreated = Math.round(new Date().getTime() / 1000)
    const payload = {
      iss: config.storeApiClientId,
      iat: dateCreated,
      jti: uuid(),
      operation: 'customer_login',
      store_hash: config.storeHash,
      customer_id: customerId,
      channel_id: config.storeChannelId,
      redirect_to: data.checkout_url,
    }
    let token = jwt.sign(payload, config.storeApiClientSecret!, {
      algorithm: 'HS256',
    })
    let checkouturl = `${config.storeUrl}/login/token/${token}`
    console.log('checkouturl', checkouturl)
    if (fullCheckout) {
      res.redirect(checkouturl)
      return
    }
  }

  // TODO: make the embedded checkout work too!
  const html = `
       <!DOCTYPE html>
         <html lang="en">
         <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Checkout</title>
           <script src="https://checkout-sdk.bigcommerce.com/v1/loader.js"></script>
           <script>
             window.onload = function() {
               checkoutKitLoader.load('checkout-sdk').then(function (service) {
                 service.embedCheckout({
                   containerId: 'checkout',
                   url: '${data.embedded_checkout_url}'
                 });
               });
             }
           </script>
         </head>
         <body>
           <div id="checkout"></div>
         </body>
       </html>
     `

  res.status(200)
  res.setHeader('Content-Type', 'text/html')
  res.write(html)
  res.end()
}

export default getCheckout

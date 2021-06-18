import type { CheckoutEndpoint } from '.'

const fullCheckout = true

const checkout: CheckoutEndpoint['handlers']['checkout'] = async ({
  req,
  res,
  config,
}) => {
  const { cookies } = req
  const cartId = cookies[config.cartCookie]

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

  if (fullCheckout) {
    res.redirect(data.checkout_url)
    return
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

export default checkout

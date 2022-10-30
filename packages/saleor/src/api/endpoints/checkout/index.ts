import { CommerceAPI, GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import checkoutEndpoint from '@vercel/commerce/api/endpoints/checkout'
import { CheckoutSchema } from '@vercel/commerce/types/checkout'

export type CheckoutAPI = GetAPISchema<CommerceAPI, CheckoutSchema>

export type CheckoutEndpoint = CheckoutAPI['endpoint']

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  config,
}) => {
  const html = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Checkout</title>
        </head>
        <body>
          <div style='margin: 10rem auto; text-align: center; font-family: SansSerif, "Segoe UI", Helvetica; color: #888;'>
             <svg xmlns="http://www.w3.org/2000/svg" style='height: 60px; width: 60px;' fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
             <h1>Checkout not yet implemented :(</h1>
             <p>
             See <a href='https://github.com/vercel/commerce/issues/64' target='_blank'>#64</a>
             </p>
          </div>
        </body>
      </html>
    `

  return {
    html,
    headers: {
      'Content-Type': 'text/html',
    },
  }
}

export const handlers: CheckoutEndpoint['handlers'] = { getCheckout }

const checkoutApi = createEndpoint<CheckoutAPI>({
  handler: checkoutEndpoint,
  handlers,
})

export default checkoutApi

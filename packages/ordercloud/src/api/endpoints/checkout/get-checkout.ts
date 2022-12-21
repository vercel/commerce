import type { CheckoutEndpoint } from '.'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  body: { cartId },
  config: { restBuyerFetch },
}) => {
  const token = req.cookies.get('token')?.value

  // Register credit card
  const payments = await restBuyerFetch(
    'GET',
    `/orders/Outgoing/${cartId}/payments`
  ).then((response: { Items: unknown[] }) => response.Items)

  const address = await restBuyerFetch(
    'GET',
    `/orders/Outgoing/${cartId}`,
    null,
    { token }
  ).then(
    (response: { ShippingAddressID: string }) => response.ShippingAddressID
  )

  // Return cart and errors

  return {
    data: {
      hasPayment: payments.length > 0,
      hasShipping: Boolean(address),
      addressId: address,
      cardId: payments[0]?.ID,
    },
  }
}

export default getCheckout

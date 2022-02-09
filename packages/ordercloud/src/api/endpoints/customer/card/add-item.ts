import type { CustomerCardEndpoint } from '.'
import type { OredercloudCreditCard } from '../../../../types/customer/card'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
  apiVersion: '2020-08-27',
})

const addItem: CustomerCardEndpoint['handlers']['addItem'] = async ({
  res,
  body: { item, cartId },
  config: { restBuyerFetch, restMiddlewareFetch },
}) => {
  // Return an error if no item is present
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  // Return an error if no item is present
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Cookie not found' }],
    })
  }

  // Get token
  const token = await stripe.tokens
    .create({
      card: {
        number: item.cardNumber,
        exp_month: item.cardExpireDate.split('/')[0],
        exp_year: item.cardExpireDate.split('/')[1],
        cvc: item.cardCvc,
      },
    })
    .then((res: { id: string }) => res.id)

  // Register credit card
  const creditCard = await restBuyerFetch('POST', `/me/creditcards`, {
    Token: token,
    CardType: 'credit',
    PartialAccountNumber: item.cardNumber.slice(-4),
    CardholderName: item.cardHolder,
    ExpirationDate: item.cardExpireDate,
  }).then((response: OredercloudCreditCard) => response.ID)

  // Assign payment to order
  const payment = await restBuyerFetch(
    'POST',
    `/orders/All/${cartId}/payments`,
    {
      Type: 'CreditCard',
      CreditCardID: creditCard,
    }
  ).then((response: { ID: string }) => response.ID)

  // Accept payment to order
  await restMiddlewareFetch(
    'PATCH',
    `/orders/All/${cartId}/payments/${payment}`,
    {
      Accepted: true,
    }
  )

  return res.status(200).json({ data: null, errors: [] })
}

export default addItem

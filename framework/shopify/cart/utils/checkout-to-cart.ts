import { Cart } from '@commerce/types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import { Checkout, CheckoutLineItemEdge, Maybe } from '@framework/schema'

const checkoutToCart = (checkoutResponse?: any): Maybe<Cart> => {
  if (!checkoutResponse) {
    throw new CommerceError({
      message: 'Missing checkout details from response cart Response',
    })
  }

  const {
    checkout,
    userErrors,
  }: { checkout?: Checkout; userErrors?: any[] } = checkoutResponse

  if (userErrors && userErrors.length) {
    throw new ValidationError({
      message: userErrors[0].message,
    })
  }

  if (!checkout) {
    throw new ValidationError({
      message: 'Missing checkout details from response cart Response',
    })
  }

  return {
    ...checkout,
    currency: { code: checkout.currencyCode },
    lineItems: checkout.lineItems?.edges.map(
      ({
        node: { id, title: name, quantity, variant },
      }: CheckoutLineItemEdge) => ({
        id,
        checkoutUrl: checkout.webUrl,
        variantId: variant?.id,
        productId: id,
        name,
        quantity,
        discounts: [],
        path: '',
        variant: {
          id: variant?.id,
          image: {
            url: variant?.image?.src,
            altText: variant?.title,
          },
          price: variant?.price,
        },
      })
    ),
  }
}

export default checkoutToCart

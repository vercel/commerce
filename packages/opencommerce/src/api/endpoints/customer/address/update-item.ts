import selectFulfillmentOptions from '../../../mutations/select-fulfillment-options'
import type { CustomerAddressEndpoint } from '.'

const updateItem: CustomerAddressEndpoint['handlers']['updateItem'] = async ({
  res,
  body: { item, cartId },
  config: { fetch, anonymousCartTokenCookie },
  req: { cookies },
}) => {
  // Return an error if no cart is present
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Cookie not found' }],
    })
  }

  if (item.shippingMethodId) {
    await fetch(selectFulfillmentOptions, {
      variables: {
        input: {
          cartId,
          cartToken: cookies[anonymousCartTokenCookie],
          fulfillmentGroupId: item.fulfillmentGroupId,
          fulfillmentMethodId: item.shippingMethodId,
        },
      },
    })
  }

  return res.status(200).json({ data: null, errors: [] })
}

export default updateItem

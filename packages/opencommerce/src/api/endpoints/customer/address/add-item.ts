import setShippingAddressOnCartMutation from '../../../mutations/add-shipping-address'
import type { CustomerAddressEndpoint } from '.'
import updateFulfillmentOptions from '../../../mutations/update-fulfillment-options'
import selectFulfillmentOptions from '../../../mutations/select-fulfillment-options'

const addItem: CustomerAddressEndpoint['handlers']['addItem'] = async ({
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

  // Register address
  const {
    data: { setShippingAddressOnCart },
  } = await fetch(setShippingAddressOnCartMutation, {
    variables: {
      input: {
        address: {
          address1: item.streetNumber || 'NextJS storefront',
          country: item.country,
          fullName: `${item.firstName || 'Test'} ${
            item.lastName || 'Account'
          }}`,
          city: item.city || 'LA',
          phone: '0123456789',
          postal: item.zipCode || '1234567',
          region: item.city || 'LA',
        },
        cartId,
        cartToken: cookies[anonymousCartTokenCookie],
      },
    },
  })

  const {
    data: { updateFulfillmentOptionsForGroup },
  } = await fetch(updateFulfillmentOptions, {
    variables: {
      input: {
        cartId,
        fulfillmentGroupId:
          setShippingAddressOnCart.cart.checkout.fulfillmentGroups[0]._id,
      },
    },
  })

  await fetch(selectFulfillmentOptions, {
    variables: {
      input: {
        cartId,
        cartToken: cookies[anonymousCartTokenCookie],
        fulfillmentGroupId:
          updateFulfillmentOptionsForGroup.cart.checkout.fulfillmentGroups[0]
            ._id,
        fulfillmentMethodId:
          updateFulfillmentOptionsForGroup.cart.checkout.fulfillmentGroups[0]
            .availableFulfillmentOptions[0].fulfillmentMethod._id,
      },
    },
  })

  return res.status(200).json({ data: null, errors: [] })
}

export default addItem

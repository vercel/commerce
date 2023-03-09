import setShippingAddressOnCartMutation from '../../../mutations/add-shipping-address'
import type { CustomerAddressEndpoint } from '.'
import updateFulfillmentOptions from '../../../mutations/update-fulfillment-options'
import selectFulfillmentOptions from '../../../mutations/select-fulfillment-options'

const addItem: CustomerAddressEndpoint['handlers']['addItem'] = async ({
  body: { item, cartId },
  config: { fetch, anonymousCartTokenCookie },
  req: { cookies },
}) => {
  // Return an error if no cart is present
  if (!cartId) {
    return {
      data: null,
      errors: [{ message: 'Cookie not found' }],
    }
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
        cartToken: cookies.get(anonymousCartTokenCookie)?.value,
        fulfillmentGroupId:
          updateFulfillmentOptionsForGroup.cart.checkout.fulfillmentGroups[0]
            ._id,
        fulfillmentMethodId:
          updateFulfillmentOptionsForGroup.cart.checkout.fulfillmentGroups[0]
            .availableFulfillmentOptions[0].fulfillmentMethod._id,
      },
    },
  })

  return { data: null, errors: [] }
}

export default addItem

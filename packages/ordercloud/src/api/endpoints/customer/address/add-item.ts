import type { CustomerAddressEndpoint } from '.'

const addItem: CustomerAddressEndpoint['handlers']['addItem'] = async ({
  res,
  body: { item, cartId },
  config: { restBuyerFetch },
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

  // Register address
  const address = await restBuyerFetch('POST', `/me/addresses`, {
    AddressName: 'main address',
    CompanyName: item.company,
    FirstName: item.firstName,
    LastName: item.lastName,
    Street1: item.streetNumber,
    Street2: item.streetNumber,
    City: item.city,
    State: item.city,
    Zip: item.zipCode,
    Country: item.country.slice(0, 2).toLowerCase(),
    Shipping: true,
  }).then((response: { ID: string }) => response.ID)

  // Assign address to order
  await restBuyerFetch('PATCH', `/orders/Outgoing/${cartId}`, {
    ShippingAddressID: address,
  })

  return res.status(200).json({ data: null, errors: [] })
}

export default addItem

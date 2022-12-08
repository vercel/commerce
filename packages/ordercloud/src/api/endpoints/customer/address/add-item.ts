import type { CustomerAddressEndpoint } from '.'

const addItem: CustomerAddressEndpoint['handlers']['addItem'] = async ({
  req,
  body: { item, cartId },
  config: { restBuyerFetch, tokenCookie },
}) => {
  const token = req.cookies.get(tokenCookie)?.value

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
  await restBuyerFetch(
    'PATCH',
    `/orders/Outgoing/${cartId}`,
    {
      ShippingAddressID: address,
    },
    { token }
  )

  return { data: null }
}

export default addItem

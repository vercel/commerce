import type { CustomerAddressEndpoint } from '.'

const getCards: CustomerAddressEndpoint['handlers']['getAddresses'] = async ({
  res,
}) => {
  return res.status(200).json({ data: null, errors: [] })
}

export default getCards

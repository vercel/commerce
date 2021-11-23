import type { CustomerAddressEndpoint } from '.'

const updateItem: CustomerAddressEndpoint['handlers']['updateItem'] = async ({
  res,
}) => {
  return res.status(200).json({ data: null, errors: [] })
}

export default updateItem

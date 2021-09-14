import type { CustomerCardEndpoint } from '.'

const updateItem: CustomerCardEndpoint['handlers']['updateItem'] = async ({
  res,
}) => {
  return res.status(200).json({ data: null, errors: [] })
}

export default updateItem

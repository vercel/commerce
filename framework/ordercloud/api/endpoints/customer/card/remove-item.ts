import type { CustomerCardEndpoint } from '.'

const removeItem: CustomerCardEndpoint['handlers']['removeItem'] = async ({
  res,
}) => {
  return res.status(200).json({ data: null, errors: [] })
}

export default removeItem

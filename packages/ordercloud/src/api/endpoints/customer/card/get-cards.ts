import type { CustomerCardEndpoint } from '.'

const getCards: CustomerCardEndpoint['handlers']['getCards'] = async ({
  res,
}) => {
  return res.status(200).json({ data: null, errors: [] })
}

export default getCards

import { getActiveCart, normalizeCart } from '../../../utils'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req,
  res,
  config,
}) => {
  const activeCart = await getActiveCart(req, res, config.sdkFetch)
  const data = activeCart ? normalizeCart(activeCart, config) : undefined
  res.status(200).json({ data })
}

export default getCart

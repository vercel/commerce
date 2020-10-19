import { BigcommerceApiError } from '../../utils/errors'
import type { WishlistList, WishlistHandlers } from '..'

// Return all wishlists
const getAllWishlists: WishlistHandlers['getAllWishlists'] = async ({
  res,
  body: { customerId },
  config,
}) => {
  let result: { data?: WishlistList } = {}

  try {
    result = await config.storeApiFetch(`/v3/wishlists/customer_id=${customerId}`)
  } catch (error) {
    throw error
  }

  const data = (result.data ?? []) as any
  res.status(200).json({ data })
}

export default getAllWishlists

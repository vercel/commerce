import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from '../utils/create-api-handler'
import { BigcommerceApiError } from '../utils/errors'
import getWishlist from './handlers/get-wishlist'
import getAllWishlists from './handlers/get-all-wishlists'
import addItem from './handlers/add-item'
import removeItem from './handlers/remove-item'
import updateWishlist from './handlers/update-wishlist'
import removeWishlist from './handlers/remove-wishlist'
import addWishlist from './handlers/add-wishlist'
import { definitions } from '../definitions/wishlist'

export type ItemBody = {
  productId: number
  variantId: number
}

export type AddItemBody = { item: ItemBody }

export type RemoveItemBody = { itemId: string }

export type WishlistBody = {
  customer_id: number
  is_public: number
  name: string
  items: any[]
}

export type AddWishlistBody = { wishlist: WishlistBody }

export type Wishlist = definitions['wishlist_Full']

export type WishlistHandlers = {
  getAllWishlists: BigcommerceHandler<Wishlist[], { customerId?: string }>
  getWishlist: BigcommerceHandler<Wishlist, { customerToken?: string }>
  addWishlist: BigcommerceHandler<
    Wishlist,
    { wishlistId: string } & Partial<AddWishlistBody>
  >
  updateWishlist: BigcommerceHandler<
    Wishlist,
    { wishlistId: string } & Partial<AddWishlistBody>
  >
  addItem: BigcommerceHandler<
    Wishlist,
    { customerToken?: string } & Partial<AddItemBody>
  >
  removeItem: BigcommerceHandler<
    Wishlist,
    { customerToken?: string } & Partial<RemoveItemBody>
  >
  removeWishlist: BigcommerceHandler<Wishlist, { wishlistId: string }>
}

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

// TODO: a complete implementation should have schema validation for `req.body`
const wishlistApi: BigcommerceApiHandler<Wishlist, WishlistHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const customerToken = cookies[config.customerCookie]

  try {
    const { wishlistId, itemId, customerId } = req.body

    // Return current wishlist info
    if (req.method === 'GET') {
      const body = { customerToken }
      return await handlers['getWishlist']({ req, res, config, body })
    }

    // Add an item to the wishlist
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken }
      return await handlers['addItem']({ req, res, config, body })
    }

    // Update a wishlist
    if (req.method === 'PUT' && wishlistId) {
      const body = { ...req.body, wishlistId }
      return await handlers['updateWishlist']({ req, res, config, body })
    }

    // Remove an item from the wishlist
    if (req.method === 'DELETE') {
      const body = { ...req.body, customerToken }
      return await handlers['removeItem']({ req, res, config, body })
    }

    // Remove the wishlist
    if (req.method === 'DELETE' && wishlistId && !itemId) {
      const body = { wishlistId: wishlistId as string }
      return await handlers['removeWishlist']({ req, res, config, body })
    }

    // Get all the wishlists
    if (req.method === 'GET' && !wishlistId) {
      const body = { customerId: customerId as string }
      return await handlers['getAllWishlists']({
        req,
        res: res as any,
        config,
        body,
      })
    }

    // Create a wishlist
    if (req.method === 'POST' && !wishlistId) {
      const { body } = req
      return await handlers['addWishlist']({ req, res, config, body })
    }
  } catch (error) {
    console.error(error)

    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export const handlers = {
  getWishlist,
  addItem,
  updateWishlist,
  removeItem,
  removeWishlist,
  getAllWishlists,
  addWishlist,
}

export default createApiHandler(wishlistApi, handlers, {})

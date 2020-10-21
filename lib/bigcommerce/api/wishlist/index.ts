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

type Body<T> = Partial<T> | undefined

export type ItemBody = {
  product_id: number
  variant_id: number
}

export type AddItemBody = { wishlistId: string; item: ItemBody }

export type RemoveItemBody = { wishlistId: string; itemId: string }

export type WishlistBody = {
  customer_id: number
  is_public: number
  name: string
  items: any[]
}

export type AddWishlistBody = { wishlist: WishlistBody }

// TODO: this type should match:
// https://developer.bigcommerce.com/api-reference/store-management/wishlists/wishlists/wishlistsbyidget
export type Wishlist = {
  id: string
  customer_id: number
  name: string
  is_public: boolean
  token: string
  items: any[]
  // TODO: add missing fields
}

export type WishlistHandlers = {
  getAllWishlists: BigcommerceHandler<Wishlist[], { customerId?: string }>
  getWishlist: BigcommerceHandler<Wishlist, { wishlistId?: string }>
  addWishlist: BigcommerceHandler<
    Wishlist,
    { wishlistId: string } & Body<AddWishlistBody>
  >
  updateWishlist: BigcommerceHandler<
    Wishlist,
    { wishlistId: string } & Body<AddWishlistBody>
  >
  addItem: BigcommerceHandler<
    Wishlist,
    { wishlistId: string } & Body<AddItemBody>
  >
  removeItem: BigcommerceHandler<
    Wishlist,
    { wishlistId: string } & Body<RemoveItemBody>
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

  try {
    const { wishlistId, itemId, customerId } = req.body
    // Return current wishlist info
    if (req.method === 'GET' && wishlistId) {
      const body = { wishlistId: wishlistId as string }
      return await handlers['getWishlist']({ req, res, config, body })
    }

    // Add an item to the wishlist
    if (req.method === 'POST' && wishlistId) {
      const body = { ...req.body, wishlistId }
      return await handlers['addItem']({ req, res, config, body })
    }

    // Update a wishlist
    if (req.method === 'PUT' && wishlistId) {
      const body = { ...req.body, wishlistId }
      return await handlers['updateWishlist']({ req, res, config, body })
    }

    // Remove an item from the wishlist
    if (req.method === 'DELETE' && wishlistId && itemId) {
      const body = {
        wishlistId: wishlistId as string,
        itemId: itemId as string,
      }
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

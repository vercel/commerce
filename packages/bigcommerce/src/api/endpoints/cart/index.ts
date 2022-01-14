import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import cartEndpoint from '@vercel/commerce/api/endpoints/cart'
import type { CartSchema } from '../../../types/cart'
import type { BigcommerceAPI } from '../..'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CartAPI = GetAPISchema<BigcommerceAPI, CartSchema>

export type CartEndpoint = CartAPI['endpoint']

export const handlers: CartEndpoint['handlers'] = {
  getCart,
  addItem,
  updateItem,
  removeItem,
}

const cartApi = createEndpoint<CartAPI>({
  handler: cartEndpoint,
  handlers,
})

export default cartApi

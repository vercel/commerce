import type { OrdercloudAPI } from '../..'
import type { CartSchema } from '@vercel/commerce/types/cart'

import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import cartEndpoint from '@vercel/commerce/api/endpoints/cart'

import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CartEndpoint = CartAPI['endpoint']
export type CartAPI = GetAPISchema<OrdercloudAPI, CartSchema>

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

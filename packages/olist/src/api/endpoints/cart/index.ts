import cartEndpoint from '@vercel/commerce/api/endpoints/cart'
import { createEndpoint } from '@vercel/commerce/api'

import type { GetAPISchema } from '@vercel/commerce/api'
import type { CartItemBody, CartSchema } from '@vercel/commerce/types/cart'

import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

import type { OlistAPI } from '../../../api'
import type { Handler as HandlerAPI } from '../../../types/api'

export type CartAPI = GetAPISchema<OlistAPI, CartSchema>

export type CartEndpoint = CartAPI['endpoint']

export const handlers: CartEndpoint['handlers'] = {
  getCart,
  addItem,
  updateItem,
  removeItem,
}

type GetCartBody = {
  cartId?: string
}

type AddItemBody = {
  item?: CartItemBody
}

type RemoveItemBody = {
  itemId?: string
}

export type Handler = {
  body: GetCartBody & AddItemBody & RemoveItemBody
} & HandlerAPI

const cartApi = createEndpoint<CartAPI>({
  handler: cartEndpoint,
  handlers,
})

export default cartApi

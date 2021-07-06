import { CommerceAPI, createEndpoint, GetAPISchema } from '@commerce/api'
import cartEndpoint from '@commerce/api/endpoints/cart'
import type { CartSchema } from '@commerce/types/cart'
import getCart from './get-cart'
import addItem from './add-item'

export type CartAPI = GetAPISchema<CommerceAPI, CartSchema>

export type CartEndpoint = CartAPI['endpoint']

export const handlers: CartEndpoint['handlers'] = {
  getCart,
  addItem,
}

const cartApi = createEndpoint<CartAPI>({
  handler: cartEndpoint,
  handlers,
})

export default cartApi

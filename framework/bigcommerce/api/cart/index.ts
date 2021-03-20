import { GetAPISchema } from '@commerce/api'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './handlers/update-item'
import removeItem from './handlers/remove-item'
import type {
  GetCartHandlerBody,
  AddCartItemHandlerBody,
  UpdateCartItemHandlerBody,
  RemoveCartItemHandlerBody,
  Cart,
} from '../../types'
import type { CommerceAPI } from '..'

export type CartAPI = GetAPISchema<
  CommerceAPI,
  {
    endpoint: {
      options: {}
      operations: {
        getCart: {
          data: Cart | null
          body: GetCartHandlerBody
          options: { yay: string }
        }
        addItem: { data: Cart; body: AddCartItemHandlerBody; options: {} }
        updateItem: { data: Cart; body: UpdateCartItemHandlerBody; options: {} }
        removeItem: { data: Cart; body: RemoveCartItemHandlerBody; options: {} }
      }
    }
  }
>

export type CartEndpoint = CartAPI['endpoint']

export const operations = { getCart, addItem }

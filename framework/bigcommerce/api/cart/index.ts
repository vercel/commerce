import type { GetAPISchema } from '@commerce/api'
import type { AddItemOperation } from '@commerce/types'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'
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
        getCart: { data: Cart | null; body: GetCartHandlerBody }
        addItem: { data: Cart; body: AddItemOperation['body'] }
        updateItem: { data: Cart; body: UpdateCartItemHandlerBody }
        removeItem: { data: Cart; body: RemoveCartItemHandlerBody }
      }
    }
  }
>

export type CartEndpoint = CartAPI['endpoint']

export const operations = { getCart, addItem, updateItem, removeItem }

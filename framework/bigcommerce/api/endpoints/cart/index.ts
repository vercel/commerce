import type { GetAPISchema } from '@commerce/api'
import type { CartSchema } from '../../../types/cart'
import type { BigcommerceAPI } from '../..'
import getCart from './get-cart'
import addItem from './add-item'
import updateItem from './update-item'
import removeItem from './remove-item'

export type CartAPI = GetAPISchema<BigcommerceAPI, CartSchema>

export type CartEndpoint = CartAPI['endpoint']

export const operations = { getCart, addItem, updateItem, removeItem }

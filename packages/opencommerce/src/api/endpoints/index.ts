import { OpenCommerceAPI, Provider } from '../index'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import checkout from './checkout'
import customerAddress from './customer/address'
import products from './catalog/products'

const endpoints = {
  cart,
  checkout,
  'customer/address': customerAddress,
  'catalog/products': products,
}

export default function opencommerceAPI(commerce: OpenCommerceAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}

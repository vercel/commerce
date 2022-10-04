import type { OrdercloudAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import checkout from './checkout'
import products from './catalog/products'
import customerCard from './customer/card'
import customerAddress from './customer/address'

const endpoints = {
  cart,
  checkout,
  'customer/card': customerCard,
  'customer/address': customerAddress,
  'catalog/products': products,
}

export default function ordercloudAPI(commerce: OrdercloudAPI) {
  return createEndpoints(commerce, endpoints)
}

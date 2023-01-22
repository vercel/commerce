import type { OrdercloudAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import checkout from './checkout'
import products from './catalog/products'
import customer from './customer'
import customerCard from './customer/card'
import customerAddress from './customer/address'
import signup from './signup'

const endpoints = {
  cart,
  checkout,
  customer: customer,
  'customer/card': customerCard,
  'customer/address': customerAddress,
  'catalog/products': products,
  signup: signup,
}

export default function ordercloudAPI(commerce: OrdercloudAPI) {
  return createEndpoints(commerce, endpoints)
}

import type { OrdercloudAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import checkout from './checkout'
import products from './catalog/products'
import customer from './customer'
import customerCard from './customer/card'
import customerAddress from './customer/address'
import signup from './signup'
import logout from './logout'

const endpoints = {
  cart,
  checkout,
  logout: logout,
  signup: signup,
  customer: customer,
  'customer/card': customerCard,
  'customer/address': customerAddress,
  'catalog/products': products,
}

export default function ordercloudAPI(commerce: OrdercloudAPI) {
  return createEndpoints(commerce, endpoints)
}

import type { BigcommerceAPI, Provider } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import login from './login'
import logout from './logout'
import signup from './signup'
import checkout from './checkout'
import customer from './customer'
import wishlist from './wishlist'
import products from './catalog/products'

const endpoints = {
  cart,
  login,
  logout,
  signup,
  checkout,
  wishlist,
  customer,
  'catalog/products': products,
}

export default function bigcommerceAPI(commerce: BigcommerceAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}

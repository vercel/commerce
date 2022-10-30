import type { KiboCommerceAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'

import cart from './cart'
import login from './login'
import logout from './logout'
import signup from './signup'
import customer from './customer'
import wishlist from './wishlist'
import products from './catalog/products'

const endpoints = {
  cart,
  login,
  logout,
  signup,
  wishlist,
  customer,
  'catalog/products': products,
}

export default function kiboCommerceAPI(commerce: KiboCommerceAPI) {
  return createEndpoints(commerce, endpoints)
}

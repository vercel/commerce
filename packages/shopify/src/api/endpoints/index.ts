import type { Provider, ShopifyAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function shopifyAPI(commerce: ShopifyAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}

import type { Provider, VendureAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function vendureAPI(commerce: VendureAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}
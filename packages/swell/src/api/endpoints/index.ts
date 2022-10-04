import type { Provider, SwellAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function handler(commerce: SwellAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}

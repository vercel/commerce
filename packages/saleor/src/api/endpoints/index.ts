import type { Provider, SaleorAPI } from '..'

import createEndpoints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

export default function saleorAPI(commerce: SaleorAPI) {
  return createEndpoints<Provider>(commerce, endpoints)
}

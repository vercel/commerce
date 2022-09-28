import type { Provider, SaleorAPI } from '..'

import handleEndpoints from '@vercel/commerce/api/endpoints'

import checkout from './checkout'

const endpoints = {
  checkout,
}

const handler = (commerce: SaleorAPI) =>
  handleEndpoints<Provider>(commerce, endpoints)

export default handler

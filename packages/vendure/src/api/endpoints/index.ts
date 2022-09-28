import type { Provider, VendureAPI } from '..'
import handleEndopints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

const handler = (commerce: VendureAPI) =>
  handleEndopints<Provider>(commerce, endpoints)

export default handler

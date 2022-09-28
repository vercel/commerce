import type { Provider, ShopifyAPI } from '..'
import handleEndopints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

const handler = (commerce: ShopifyAPI) =>
  handleEndopints<Provider>(commerce, endpoints)

export default handler

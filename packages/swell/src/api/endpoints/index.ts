import type { Provider, SwellAPI } from '..'
import handleEndopints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

const handler = (commerce: SwellAPI) =>
  handleEndopints<Provider>(commerce, endpoints)

export default handler

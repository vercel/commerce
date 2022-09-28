import type { SpreeApiProvider, SpreeApi } from '..'
import handleEndopints from '@vercel/commerce/api/endpoints'
import checkout from './checkout'

const endpoints = {
  checkout,
}

const handler = (commerce: SpreeApi) =>
  handleEndopints<SpreeApiProvider>(commerce, endpoints)

export default handler

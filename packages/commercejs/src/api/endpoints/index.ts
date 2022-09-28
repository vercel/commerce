import type { CommercejsAPI } from '..'

import handleEndpoints from '@vercel/commerce/api/endpoints'

import login from './login'
import checkout from './checkout'

const endpoints = {
  login,
  checkout,
}

const handler = (commerce: CommercejsAPI) =>
  handleEndpoints(commerce, endpoints)

export default handler

import type { Provider, SFCCProviderAPI } from '..'

import handleEndpoints from '@vercel/commerce/api/endpoints'

import products from './catalog/products'

const endpoints = {
  'catalog/products': products,
}

const handler = (commerce: SFCCProviderAPI) =>
  handleEndpoints(commerce, endpoints)

export default handler

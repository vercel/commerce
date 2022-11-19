import type { CustomerCardEndpoint } from '.'

const updateItem: CustomerCardEndpoint['handlers']['updateItem'] = () => {
  return Promise.resolve({ data: null })
}

export default updateItem

import type { CustomerCardEndpoint } from '.'

const removeItem: CustomerCardEndpoint['handlers']['removeItem'] = () => {
  return Promise.resolve({ data: null })
}

export default removeItem

import type { CustomerAddressEndpoint } from '.'

const removeItem: CustomerAddressEndpoint['handlers']['removeItem'] = () => {
  return Promise.resolve({ data: null })
}

export default removeItem

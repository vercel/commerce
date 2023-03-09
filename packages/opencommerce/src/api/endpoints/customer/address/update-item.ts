import type { CustomerAddressEndpoint } from '.'

const updateItem: CustomerAddressEndpoint['handlers']['updateItem'] = () => {
  return Promise.resolve({ data: null })
}

export default updateItem

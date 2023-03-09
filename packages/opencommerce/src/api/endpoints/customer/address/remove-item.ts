import type { CustomerAddressEndpoint } from '.'

const removeItem: CustomerAddressEndpoint['handlers']['removeItem'] =
  async ({}) => {
    return { data: null, errors: [] }
  }

export default removeItem

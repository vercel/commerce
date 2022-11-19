import type { CustomerAddressEndpoint } from '.'

const getAddresses: CustomerAddressEndpoint['handlers']['getAddresses'] =
  () => {
    return Promise.resolve({ data: null })
  }

export default getAddresses

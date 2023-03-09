import type { CustomerAddressEndpoint } from '.'

const getCards: CustomerAddressEndpoint['handlers']['getAddresses'] =
  async ({}) => {
    return { data: null, errors: [] }
  }

export default getCards

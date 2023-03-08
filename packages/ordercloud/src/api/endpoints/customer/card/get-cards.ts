import type { CustomerCardEndpoint } from '.'

const getCards: CustomerCardEndpoint['handlers']['getCards'] = () => {
  return Promise.resolve({ data: null })
}

export default getCards

export const localProvider = {
  locale: 'en-us',
  cartCookie: '',
  fetcher: () => {},
  cart: {},
  customer: {},
  products: {},
  auth: {},
}

export type LocalProvider = typeof localProvider

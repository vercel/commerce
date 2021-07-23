import type { Provider } from '@commerce'
import { Config } from '.'
import fetcher from './fetcher'

// import { handler as useCart } from './cart/use-cart'
// import { handler as useAddItem } from './cart/use-add-item'
// import { handler as useUpdateItem } from './cart/use-update-item'
// import { handler as useRemoveItem } from './cart/use-remove-item'

// import { handler as useCustomer } from './customer/use-customer'
// import { handler as useSearch } from './product/use-search'

// import { handler as useLogin } from './auth/use-login'
// import { handler as useLogout } from './auth/use-logout'
// import { handler as useSignup } from './auth/use-signup'

// export const saleorProvider = {
//   locale: 'en-us',
//   cartCookie: '',
//   cartCookieToken: '',
//   fetcher,
//   cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
//   customer: { useCustomer },
//   products: { useSearch },
//   auth: { useLogin, useLogout, useSignup },
// }

export const createProvider = (options: { config: Config }): Provider => {
  const { config } = options

  return {
    locale: '', // Not an optional key in TypeScript, but already set in config. So, just make it an empty string.
    cartCookie: '', // Not an optional key in TypeScript, but already set in config. So, just make it an empty string.
    fetcher: createFetcher({ host: config.store.host }),
    // FIXME: Add dummy hooks for below based on framework/local EXCEPT use-product
    cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
    customer: { useCustomer },
    products: { useSearch },
    auth: { useLogin, useLogout, useSignup },
  }
}

export type { Provider }

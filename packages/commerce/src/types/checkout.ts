import type { UseSubmitCheckout } from '../checkout/use-submit-checkout'
import type { Address, AddressFields } from './customer/address'
import type { Card, CardFields } from './customer/card'

// Index
export type Checkout = any

export type CheckoutTypes = {
  card?: Card | CardFields
  address?: Address | AddressFields
  checkout?: Checkout
  hasPayment?: boolean
  hasShipping?: boolean
}

export type SubmitCheckoutHook<T extends CheckoutTypes = CheckoutTypes> = {
  data: T
  input?: T
  fetcherInput: T
  body: { item: T }
  actionInput: T
}

export type GetCheckoutHook<T extends CheckoutTypes = CheckoutTypes> = {
  data: T['checkout'] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
  mutations: { submit: UseSubmitCheckout }
}

export type CheckoutHooks<T extends CheckoutTypes = CheckoutTypes> = {
  submitCheckout?: SubmitCheckoutHook<T>
  getCheckout: GetCheckoutHook<T>
}

export type GetCheckoutHandler<T extends CheckoutTypes = CheckoutTypes> =
  GetCheckoutHook<T> & {
    body: { cartId: string }
  }

export type SubmitCheckoutHandler<T extends CheckoutTypes = CheckoutTypes> =
  SubmitCheckoutHook<T> & {
    body: { cartId: string }
  }

export type CheckoutHandlers<T extends CheckoutTypes = CheckoutTypes> = {
  getCheckout: GetCheckoutHandler<T>
  submitCheckout?: SubmitCheckoutHandler<T>
}

export type CheckoutSchema<T extends CheckoutTypes = CheckoutTypes> = {
  endpoint: {
    options: {}
    handlers: CheckoutHandlers<T>
  }
}

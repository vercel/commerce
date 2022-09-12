import type { UseSubmitCheckout } from '../checkout/use-submit-checkout'
import type { Address, AddressFields } from './customer/address'
import type { Card, CardFields } from './customer/card'

// Index
export type Checkout = any

export type CheckoutBody = any

export type CheckoutTypes = {
  card?: Card | CardFields
  address?: Address | AddressFields
  checkout?: Checkout
  hasPayment?: boolean
  hasShipping?: boolean
}

export type SubmitCheckoutHook = {
  data: Checkout
  input?: CheckoutBody
  fetcherInput: CheckoutBody
  body: { item: CheckoutBody }
  actionInput: CheckoutBody
}

export type GetCheckoutHook = {
  data: Checkout | null | undefined
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
  mutations: { submit: UseSubmitCheckout }
}

export type CheckoutHooks = {
  submitCheckout?: SubmitCheckoutHook
  getCheckout: GetCheckoutHook
}

export type GetCheckoutHandler = GetCheckoutHook & {
  body: { cartId: string }
}

export type SubmitCheckoutHandler = SubmitCheckoutHook & {
  body: { cartId: string }
}

export type CheckoutHandlers = {
  getCheckout: GetCheckoutHandler
  submitCheckout?: SubmitCheckoutHandler
}

export type CheckoutSchema = {
  endpoint: {
    options: {}
    handlers: CheckoutHandlers
  }
}

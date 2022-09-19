import type { UseSubmitCheckout } from '../checkout/use-submit-checkout'
import type { Address, AddressFields } from './customer/address'
import type { Card, CardFields } from './customer/card'
import type { LineItem } from './cart'

export type Checkout = {
  /**
   * Indicates if the payment has been submitted.
   */
  hasPayment: boolean
  /**
   * Indicates if the checkout has shipping information collected.
   */
  hasShipping: boolean
  /**
   * The unique identifier for the address that the customer has selected for shipping.
   */
  addressId: string
  /**
   * The list of payments that the customer has selected for the checkout.
   */
  payments?: Card[]
  /**
   * The unique identifier of the card that the customer has selected for payment.
   */
  cardId?: string
  /**
   * List of items in the checkout.
   */
  lineItems?: LineItem[]
}

export type CheckoutBody = {
  /**
   * The unique identifier for the cart.
   */
  cartId?: string
  /**
   * The Card information.
   * @see CardFields
   */
  card: CardFields
  /**
   * The Address information.
   * @see AddressFields
   */
  address: AddressFields
}

export interface CheckoutTypes {
  card?: Card | CardFields
  address?: Address | AddressFields
  checkout?: Checkout
  hasPayment?: boolean
  hasShipping?: boolean
}

export interface SubmitCheckoutHook {
  data: Checkout
  input?: CheckoutBody
  fetcherInput: CheckoutBody
  body: { item: CheckoutBody }
  actionInput: CheckoutBody
}

export interface GetCheckoutHook {
  data: Checkout | null | undefined
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
  mutations: { submit: UseSubmitCheckout }
}

export interface CheckoutHooks {
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

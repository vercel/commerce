import type { UseSubmitCheckout } from '../checkout/use-submit-checkout'
import type { AddressFields } from './customer/address'
import type { Card, CardFields } from './customer/card'
import type { LineItem } from './cart'

export interface Checkout {
  /**
   * Indicates if the checkout has payment iformation collected.
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
   * The list of payment cards that the customer has available.
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

export interface CheckoutBody {
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

export type SubmitCheckoutHook = {
  data: Checkout | null
  input?: CheckoutBody
  fetcherInput: CheckoutBody
  body: { item: CheckoutBody }
  actionInput: CheckoutBody
}

export type GetCheckoutHook = {
  data: Checkout | null
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
  body: { cartId?: string }
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

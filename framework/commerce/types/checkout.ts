// Index
export type CheckoutTypes = {
  card?: any;
  address?: any;
  checkout?: any;
  hasPayment?: boolean;
  hasShipping?: boolean;
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
}

export type CheckoutHooks<T extends CheckoutTypes = CheckoutTypes> = {
  submitCheckout: SubmitCheckoutHook<T>
  getCheckout: GetCheckoutHook<T>
}

export type GetCheckoutHandler<T extends CheckoutTypes = CheckoutTypes> = GetCheckoutHook<T> & {
  body: { cartId: string }
}

export type SubmitCheckoutHandler<T extends CheckoutTypes = CheckoutTypes> = SubmitCheckoutHook<T> & {
  body: { cartId: string }
}

export type CheckoutHandlers<T extends CheckoutTypes = CheckoutTypes> = {
  getCheckout: GetCheckoutHandler<T>
  submitCheckout: SubmitCheckoutHandler<T>
}

export type CheckoutSchema<T extends CheckoutTypes = CheckoutTypes> = {
  endpoint: {
    options: {}
    handlers: CheckoutHandlers<T>
  }
}

export * from '@commerce/types/checkout'

import type { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture'

export interface CommercejsCheckoutCapture extends CheckoutCapture {
  payment: {
    gateway: CheckoutCapture['payment']['gateway']
    card: {
      number: string
      expiry_month: string
      expiry_year: string
      cvc: string
      postal_zip_code: string
    }
  }
}


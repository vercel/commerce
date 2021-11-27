import type { CommercejsCheckoutCapture } from '../types/checkout'

/**
 * Creates a checkout payload suitable for test checkouts.
 * 1. Hardcodes the payment values for the Commerce.js test gateway.
 * 2. Adds fallback customer names
 * 2. Generates a customer email using first name because email field does not exist on the UI.
 */
export function normalizeTestCheckout({
  customer,
}: {
  customer?: Partial<CommercejsCheckoutCapture['customer']>
}): CommercejsCheckoutCapture {
  return {
    payment: {
      gateway: 'test_gateway',
      card: {
        number: '4242 4242 4242 4242',
        expiry_month: '01',
        expiry_year: '2024',
        cvc: '123',
        postal_zip_code: '94103',
      },
    },
    customer: {
      email: 'nextcommerce@test.com',
      firstname: customer?.firstname || 'Nextjs',
      lastname: customer?.lastname || 'Commerce',
    },
  }
}

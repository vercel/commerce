import type { CardFields } from '@vercel/commerce/types/customer/card'
import type { AddressFields } from '@vercel/commerce/types/customer/address'
import type { CommercejsCheckoutCapture } from '../types/checkout'

/**
 * Creates a checkout payload suitable for test checkouts.
 * 1. Hard-codes the payment values for the Commerce.js test gateway.
 * 2. Hard-codes the email until an email field exists on the checkout form.
 * 3. Gets as much as much checkout info as possible from the checkout form, and uses fallback values.
 */
export function normalizeTestCheckout({
  paymentInfo,
  shippingInfo,
  shippingOption,
}: {
  paymentInfo?: CardFields
  shippingInfo?: AddressFields
  shippingOption: string
}): CommercejsCheckoutCapture {
  const firstName =
    shippingInfo?.firstName || paymentInfo?.firstName || 'Nextjs'
  const lastName = shippingInfo?.lastName || paymentInfo?.lastName || 'Commerce'
  const fullName = `${firstName} ${lastName}`
  const postalCode = shippingInfo?.zipCode || paymentInfo?.zipCode || '94103'
  const street =
    shippingInfo?.streetNumber || paymentInfo?.streetNumber || 'Test Street'
  const townCity = shippingInfo?.city || paymentInfo?.city || 'Test Town'

  return {
    payment: {
      gateway: 'test_gateway',
      card: {
        number: '4242 4242 4242 4242',
        expiry_month: '01',
        expiry_year: '2024',
        cvc: '123',
        postal_zip_code: postalCode,
      },
    },
    customer: {
      email: 'nextcommerce@test.com',
      firstname: firstName,
      lastname: lastName,
    },
    shipping: {
      name: fullName,
      street,
      town_city: townCity,
      country: 'US',
    },
    billing: {
      name: fullName,
      street,
      town_city: townCity,
      postal_zip_code: postalCode,
      county_state: 'California',
      country: 'US',
    },
    fulfillment: {
      shipping_method: shippingOption,
    },
  }
}

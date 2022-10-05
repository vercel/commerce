import type { GetSiteInfoQuery } from '../schema'

export type BCCategory = NonNullable<
  GetSiteInfoQuery['site']['categoryTree']
>[0]

export type BCBrand = NonNullable<
  NonNullable<GetSiteInfoQuery['site']['brands']['edges']>[0]
>

// TODO: this type should match:
// https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/getacart#responses
export type BigcommerceCart = {
  id: string
  parent_id?: string
  customer_id: number
  email: string
  currency: { code: string }
  tax_included: boolean
  base_amount: number
  discount_amount: number
  cart_amount: number
  line_items: {
    custom_items: any[]
    digital_items: any[]
    gift_certificates: any[]
    physical_items: any[]
  }
  created_time: string
  discounts?: { id: number; discounted_amount: number }[]
  // TODO: add missing fields
}

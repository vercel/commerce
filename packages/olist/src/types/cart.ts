export * from '@vercel/commerce/types/cart'

export type RawCartItemRequest = {
  sku: string
  quantity: number
  extra?: {}
  place_id?: number
}

export type RawCartResponse = {
  agent: string
  billing_address_id: number
  channel: string
  client_id: number
  code: string
  coupon_code: string
  discount: {
    id: number
    name: string
    description: string
    facebook: false
    valid_to: string
    seal_uid: string
    seal_url: string
    start_at: string
    end_at: string
    email: string
    cpf: string
    tags: string
  }
  discount_price: number
  extra: Record<string, any>
  id: number
  items: RawCartItemResponse[]
  items_count: number
  shipping_address_id: number
  shipping_method: string
  shipping_methods: [
    {
      package: string
      name: string
      label: string
      price: string
      delivery_days: string
      delivery_type: string
      description: string
      short_description: string
    }
  ]
  shipping_price: number
  subtotal: number
  token: string
  total: number
  total_for_deposit: number
  total_for_slip: number
  total_for_pix: number
  updated_at: string
  rebate_token: string
  rebate_discount: number
  handling_days: number
  subtotal_discount: number
  total_discount: number
}

export type RawCartItemResponse = {
  id: string
  available_quantity: number
  delivery_days: number
  extra: Record<string, any>
  place_id: number
  price: number
  product_id: number
  product_name: string
  product_reference: string
  product_url: string
  product_type: string
  quantity: number
  seller: string
  seller_name: string
  subtotal: number
  total: number
  updated_at: string
  has_customizations: boolean
  image_url: string
  variant_attributes: Record<string, any>
  variant_min_quantity: number
  variant_name: string
  variant_price: number
  variant_intl_price: number
  variant_properties: Record<
    string,
    { name: string; value: string; defining: boolean }
  >
  variant_sku: string
}

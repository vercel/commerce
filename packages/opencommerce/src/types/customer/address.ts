import * as Core from '@vercel/commerce/types/customer/address'

export * from '@vercel/commerce/types/customer/address'

export type AddressFields = Core.AddressFields & {
  shippingMethodId?: string
  fulfillmentGroupId?: string
}

export type CustomerAddressTypes = Core.CustomerAddressTypes & {
  fields: AddressFields
}

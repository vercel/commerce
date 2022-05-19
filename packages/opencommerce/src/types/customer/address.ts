import * as Core from '@vercel/commerce/types/customer/address'

export * from '@vercel/commerce/types/customer/address'

export type AddressFields = Core.AddressFields & {
  shippingMethod?: {
    id: string
    fulfillmentGroupId: string
  }
}

export type CustomerAddressTypes = Core.CustomerAddressTypes & {
  fields: AddressFields
}

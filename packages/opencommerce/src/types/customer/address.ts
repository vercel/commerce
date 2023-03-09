import * as Core from '@vercel/commerce/types/customer/address'

export * from '@vercel/commerce/types/customer/address'

export type AddressFields = Core.AddressFields & {
  shippingMethodId?: string
  fulfillmentGroupId?: string
}

export type UpdateAddressItemHook = Omit<
  Core.UpdateItemHook,
  'input' | 'body' | 'fetcherInput' | 'actionInput'
> & {
  input: {
    item?: AddressFields
    wait?: number
  }
  body: {
    itemId: string
    item: AddressFields
  }
  fetcherInput: { itemId: string; item: AddressFields }
  actionInput: AddressFields & { id: string }
}

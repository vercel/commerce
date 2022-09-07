export interface Address {
  id: string
  mask: string
}

export interface AddressFields {
  type: string
  firstName: string
  lastName: string
  company: string
  streetNumber: string
  apartments: string
  zipCode: string
  city: string
  country: string
}

export type GetAddressesHook = {
  data: Address[] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

export type AddItemHook = {
  data: Address
  input?: AddressFields
  fetcherInput: AddressFields
  body: { item: AddressFields }
  actionInput: AddressFields
}

export type UpdateItemHook = {
  data: Address | null
  input: { item?: AddressFields; wait?: number }
  fetcherInput: { itemId: string; item: AddressFields }
  body: { itemId: string; item: AddressFields }
  actionInput: AddressFields & { id: string }
}

export type RemoveItemHook = {
  data: Address | null
  input: { item?: Address }
  fetcherInput: { itemId: string }
  body: { itemId: string }
  actionInput: { id: string }
}

export type CustomerAddressHooks = {
  getAddresses: GetAddressesHook
  addItem: AddItemHook
  updateItem: UpdateItemHook
  removeItem: RemoveItemHook
}

export type AddressHandler = GetAddressesHook & {
  body: { cartId?: string }
}

export type AddItemHandler = AddItemHook & {
  body: { cartId: string }
}

export type UpdateItemHandler = UpdateItemHook & {
  data: Address
  body: { cartId: string }
}

export type RemoveItemHandler = RemoveItemHook & {
  body: { cartId: string }
}

export type CustomerAddressHandlers = {
  getAddresses: GetAddressesHook
  addItem: AddItemHandler
  updateItem: UpdateItemHandler
  removeItem: RemoveItemHandler
}

export type CustomerAddressSchema = {
  endpoint: {
    options: {}
    handlers: CustomerAddressHandlers
  }
}

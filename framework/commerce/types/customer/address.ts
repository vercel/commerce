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

export type CustomerAddressTypes = {
  address?: Address
  fields: AddressFields
}

export type GetAddressesHook<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = {
  data: T['address'][] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

export type AddItemHook<T extends CustomerAddressTypes = CustomerAddressTypes> =
  {
    data: T['address']
    input?: T['fields']
    fetcherInput: T['fields']
    body: { item: T['fields'] }
    actionInput: T['fields']
  }

export type UpdateItemHook<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = {
  data: T['address'] | null
  input: { item?: T['fields']; wait?: number }
  fetcherInput: { itemId: string; item: T['fields'] }
  body: { itemId: string; item: T['fields'] }
  actionInput: T['fields'] & { id: string }
}

export type RemoveItemHook<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = {
  data: T['address'] | null
  input: { item?: T['address'] }
  fetcherInput: { itemId: string }
  body: { itemId: string }
  actionInput: { id: string }
}

export type CustomerAddressHooks<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = {
  getAddresses: GetAddressesHook<T>
  addItem: AddItemHook<T>
  updateItem: UpdateItemHook<T>
  removeItem: RemoveItemHook<T>
}

export type AddressHandler<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = GetAddressesHook<T> & {
  body: { cartId?: string }
}

export type AddItemHandler<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = AddItemHook<T> & {
  body: { cartId: string }
}

export type UpdateItemHandler<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = UpdateItemHook<T> & {
  data: T['address']
  body: { cartId: string }
}

export type RemoveItemHandler<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = RemoveItemHook<T> & {
  body: { cartId: string }
}

export type CustomerAddressHandlers<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = {
  getAddresses: GetAddressesHook<T>
  addItem: AddItemHandler<T>
  updateItem: UpdateItemHandler<T>
  removeItem: RemoveItemHandler<T>
}

export type CustomerAddressSchema<
  T extends CustomerAddressTypes = CustomerAddressTypes
> = {
  endpoint: {
    options: {}
    handlers: CustomerAddressHandlers<T>
  }
}

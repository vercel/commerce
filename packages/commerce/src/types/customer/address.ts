export interface Address {
  /**
   * The unique identifier for the address.
   */
  id: string
  /**
   * The customer's first name.
   */
  mask: string
}

export interface AddressFields {
  /**
   * The type of address.
   * @example "billing, shipping"
   */
  type: string
  /**
   * The customer's first name.
   */
  firstName: string
  /**
   * The customer's last name.
   */
  lastName: string
  /**
   * Company name.
   */
  company: string
  /**
   * The customer's billing address street number.
   */
  streetNumber: string
  /**
   * The customer's billing address apartment number.
   */
  apartments: string
  /**
   * The customer's billing address zip code.
   */
  zipCode: string
  /**
   * The customer's billing address city.
   */
  city: string
  /**
   * The customer's billing address country.
   */
  country: string
}

/**
 * Hooks for managing a customer's addresses.
 */

export type GetAddressesHook = {
  data: Address[] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

export type AddItemHook = {
  data: Address | null
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

/**
 * API endpoints for managing a customer's addresses.
 */

export type AddItemHandler = AddItemHook & {
  body: { cartId: string }
}

export type UpdateItemHandler = UpdateItemHook & {
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

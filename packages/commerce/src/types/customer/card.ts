export interface Card {
  id: string
  mask: string
  provider: string
}

export interface CardFields {
  cardHolder: string
  cardNumber: string
  cardExpireDate: string
  cardCvc: string
  firstName: string
  lastName: string
  company: string
  streetNumber: string
  zipCode: string
  city: string
  country: string
}

export type CustomerCardTypes = {
  card?: Card
  fields: CardFields
}

export type GetCardsHook<T extends CustomerCardTypes = CustomerCardTypes> = {
  data: T['card'][] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

export type AddItemHook<T extends CustomerCardTypes = CustomerCardTypes> = {
  data: T['card']
  input?: T['fields']
  fetcherInput: T['fields']
  body: { item: T['fields'] }
  actionInput: T['fields']
}

export type UpdateItemHook<T extends CustomerCardTypes = CustomerCardTypes> = {
  data: T['card'] | null
  input: { item?: T['fields']; wait?: number }
  fetcherInput: { itemId: string; item: T['fields'] }
  body: { itemId: string; item: T['fields'] }
  actionInput: T['fields'] & { id: string }
}

export type RemoveItemHook<T extends CustomerCardTypes = CustomerCardTypes> = {
  data: T['card'] | null
  input: { item?: T['card'] }
  fetcherInput: { itemId: string }
  body: { itemId: string }
  actionInput: { id: string }
}

export type CustomerCardHooks<T extends CustomerCardTypes = CustomerCardTypes> =
  {
    getCards: GetCardsHook<T>
    addItem: AddItemHook<T>
    updateItem: UpdateItemHook<T>
    removeItem: RemoveItemHook<T>
  }

export type CardsHandler<T extends CustomerCardTypes = CustomerCardTypes> =
  GetCardsHook<T> & {
    body: { cartId?: string }
  }

export type AddItemHandler<T extends CustomerCardTypes = CustomerCardTypes> =
  AddItemHook<T> & {
    body: { cartId: string }
  }

export type UpdateItemHandler<T extends CustomerCardTypes = CustomerCardTypes> =
  UpdateItemHook<T> & {
    data: T['card']
    body: { cartId: string }
  }

export type RemoveItemHandler<T extends CustomerCardTypes = CustomerCardTypes> =
  RemoveItemHook<T> & {
    body: { cartId: string }
  }

export type CustomerCardHandlers<
  T extends CustomerCardTypes = CustomerCardTypes
> = {
  getCards: GetCardsHook<T>
  addItem: AddItemHandler<T>
  updateItem: UpdateItemHandler<T>
  removeItem: RemoveItemHandler<T>
}

export type CustomerCardSchema<
  T extends CustomerCardTypes = CustomerCardTypes
> = {
  endpoint: {
    options: {}
    handlers: CustomerCardHandlers<T>
  }
}

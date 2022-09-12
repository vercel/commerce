export interface Card {
  /**
   * Unique identifier for the card.
   */
  id: string
  /**
   * Masked card number.
   * @example "************4242"
   */
  mask: string
  /**
   * The card's brand.
   * @example "Visa, Mastercard, etc."
   */
  provider: string
}

/**
 * The fields required to create a new card.
 */
export interface CardFields {
  /**
   *  Name on the card.
   */
  cardHolder: string
  /**
   * The card's number, consisting of 16 digits.
   */
  cardNumber: string
  /**
   * The card's expiry month and year, in the format MM/YY.
   * @example "01/25"
   */
  cardExpireDate: string
  /**
   * The card's security code, consisting of 3 digits.
   */
  cardCvc: string
  /**
   *  The customer's first name.
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
 * Hook for getting a customer's cards.
 */
export interface GetCardsHook {
  data: Card[] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

/**
 * Hook for adding a card to a customer's account.
 */
export interface AddItemHook {
  data: Card
  input?: CardFields
  fetcherInput: CardFields
  body: { item: CardFields }
  actionInput: CardFields
}

/**
 * Hook for updating a card from a customer's account.
 */
export interface UpdateItemHook {
  data: Card | null | undefined
  input: { item?: CardFields; wait?: number }
  fetcherInput: { itemId: string; item: CardFields }
  body: { itemId: string; item: CardFields }
  actionInput: CardFields & { id: string }
}

/**
 * Hook for removing a card from a customer's account.
 */
export interface RemoveItemHook {
  data: Card | null | undefined
  input: { item?: Card }
  fetcherInput: { itemId: string }
  body: { itemId: string }
  actionInput: { id: string }
}

/**
 * Hooks for add, update & remove items from the cart.
 */
export interface CustomerCardHooks {
  getCards: GetCardsHook
  addItem: AddItemHook
  updateItem: UpdateItemHook
  removeItem: RemoveItemHook
}

/**
 * Customer card API handler
 */
export type AddItemHandler = AddItemHook & {
  body: { cartId: string }
}

export type UpdateItemHandler = UpdateItemHook & {
  data: Card
  body: { cartId: string }
}

export type RemoveItemHandler = RemoveItemHook & {
  body: { cartId: string }
}

/**
 * Customer card API handlers.
 */
export type CustomerCardHandlers = {
  getCards: GetCardsHook
  addItem: AddItemHandler
  updateItem: UpdateItemHandler
  removeItem: RemoveItemHandler
}

/**
 * Customer card API endpoints.
 */
export type CustomerCardSchema = {
  endpoint: {
    options: {}
    handlers: CustomerCardHandlers
  }
}

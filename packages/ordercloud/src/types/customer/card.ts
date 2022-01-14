import * as Core from '@vercel/commerce/types/customer/card'

export type CustomerCardTypes = Core.CustomerCardTypes
export type CustomerCardSchema = Core.CustomerCardSchema<CustomerCardTypes>

export interface OredercloudCreditCard {
  ID: string
  Editable: boolean
  Token: string
  DateCreated: string
  CardType: string
  PartialAccountNumber: string
  CardholderName: string
  ExpirationDate: string
  xp: null
}

import {
  Checkout as CheckoutSchema,
  FulfillmentOption as FulfillmentOptionSchema,
  FulfillmentGroup as FulfillmentGroupSchema,
} from '../../schema'

export * from '@vercel/commerce/types/cart'

type FulfillmentOption = FulfillmentOptionSchema & {
  fulfillmentMethod?: NonNullable<FulfillmentOptionSchema['fulfillmentMethod']>
}

export type FulfillmentGroup = {
  availableFulfillmentOptions: FulfillmentOption[] | null
  selectedFulfillmentOption: FulfillmentOption | null
  data: FulfillmentGroupSchema['data']
  type: string
  _id: string
}

export type Checkout = {
  fulfillmentGroups: FulfillmentGroup[]
  summary: CheckoutSchema['summary']
}

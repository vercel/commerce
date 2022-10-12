import { z } from 'zod'
import { cartLineItemSchema } from './cart'
import { addressFieldsSchema, cardFieldsSchema } from './customer'

export const getCheckoutBodySchema = z.object({
  cartId: z.string().optional(),
})

export const submitCheckoutBodySchema = z.object({
  cartId: z.string(),
  item: z.object({
    cartId: z.string().optional(),
    card: cardFieldsSchema,
    address: addressFieldsSchema,
  }),
})

export const checkoutSchema = z.object({
  hasPayment: z.boolean(),
  hasShipping: z.boolean(),
  addressId: z.string(),
  payments: z.array(cardFieldsSchema).optional(),
  cardId: z.string().optional(),
  lineItems: z.array(cartLineItemSchema).optional(),
})

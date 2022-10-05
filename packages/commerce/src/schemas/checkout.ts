import { z } from 'zod'
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

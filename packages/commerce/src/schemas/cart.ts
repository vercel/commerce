import { z } from 'zod'

export const getCartBodySchema = z.object({
  cartId: z.string().optional(),
})

export const cartItemBodySchema = z.object({
  variantId: z.string(),
  productId: z.string().optional(),
  quantity: z.number().min(1).optional(),
})

export const addItemBodySchema = z.object({
  cartId: z.string(),
  item: cartItemBodySchema,
})

export const updateItemBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
  item: cartItemBodySchema,
})

export const removeItemBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
})

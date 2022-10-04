import { z } from 'zod'

export const getWishlistBodySchema = z.object({
  customerAccessToken: z.string(),
  includeProducts: z.boolean(),
})

export const wishlistItemBodySchema = z.object({
  productId: z.string(),
  variantId: z.string(),
})

export const addItemBodySchema = z.object({
  cartId: z.string().optional(),
  item: wishlistItemBodySchema,
})

export const updateItemBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
  item: wishlistItemBodySchema,
})

export const removeItemBodySchema = z.object({
  cartId: z.string(),
  itemId: z.string(),
})

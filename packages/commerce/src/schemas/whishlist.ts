import { z } from 'zod'
import { productSchema } from './product'

export const wishlistSchemaItem = z.object({
  id: z.string(),
  productId: z.string(),
  variantId: z.string(),
  product: productSchema.optional(),
})

export const wishlistSchema = z.object({
  id: z.string(),
  items: z.array(wishlistSchemaItem),
  token: z.string().optional(),
})

export const getWishlistBodySchema = z.object({
  customerToken: z.string().optional(),
  includeProducts: z.boolean(),
})

export const wishlistItemBodySchema = z.object({
  productId: z.string(),
  variantId: z.string(),
})

export const addItemBodySchema = z.object({
  customerToken: z.string(),
  item: wishlistItemBodySchema,
})

export const updateItemBodySchema = z.object({
  customerToken: z.string(),
  itemId: z.string(),
  item: wishlistItemBodySchema,
})

export const removeItemBodySchema = z.object({
  customerToken: z.string(),
  itemId: z.string(),
})

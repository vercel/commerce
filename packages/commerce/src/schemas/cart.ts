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
  cartId: z.string().optional(),
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

export const discountSchema = z.object({
  value: z.number(),
})

export const optionsSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.string(),
})

export const cartProductVariantSchema = z.object({
  id: z.string(),
  sku: z.string().optional(),
  name: z.string(),
  price: z.number(),
  listPrice: z.number(),
  availableForSale: z.boolean().optional(),
  requiresShipping: z.boolean().optional(),
  image: z.object({
    url: z.string(),
    altText: z.string().optional(),
  }),
  weight: z
    .object({
      value: z.number(),
      unit: z.string(),
    })
    .optional(),
  height: z
    .object({
      value: z.number(),
      unit: z.string(),
    })
    .optional(),
  width: z
    .object({
      value: z.number(),
      unit: z.string(),
    })
    .optional(),
  depth: z
    .object({
      value: z.number(),
      unit: z.string(),
    })
    .optional(),
})

export const cartLineItemSchema = z.object({
  id: z.string(),
  variantId: z.string(),
  productId: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  discounts: z.array(discountSchema).optional(),
  path: z.string().startsWith('/').optional(),
  variant: cartProductVariantSchema,
  options: z.array(optionsSchema).optional(),
})

export const cartSchema = z.object({
  id: z.string(),
  customerId: z.string().optional(),
  url: z.string().optional(),
  email: z.string().optional(),
  createdAt: z.string(),
  currency: z.object({ code: z.string() }),
  taxesIncluded: z.boolean(),
  lineItems: z.array(cartLineItemSchema),
  lineItemsSubtotalPrice: z.number(),
  subtotalPrice: z.number(),
  totalPrice: z.number(),
  discounts: z.array(discountSchema).optional(),
})

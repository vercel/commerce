import { z } from 'zod'

export const productPriceSchema = z.object({
  value: z.number(),
  currencyCode: z.string().optional(),
  retailPrice: z.number().optional(),
})

export const productOptionSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  values: z.array(
    z.object({
      label: z.string(),
      hexColors: z.array(z.string()).optional(),
    })
  ),
})

export const productImageSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

export const productVariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  name: z.string(),
  options: z.array(productOptionSchema),
  image: productImageSchema.optional(),
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  descriptionHtml: z.string().optional(),
  sku: z.string().optional(),
  slug: z.string(),
  path: z.string().startsWith('/'),
  images: z.array(productImageSchema),
  variants: z.array(productVariantSchema),
  price: productPriceSchema,
  options: z.array(productOptionSchema),
  vendor: z.string().optional(),
})

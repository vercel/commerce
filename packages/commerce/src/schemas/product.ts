import { boolean, z } from 'zod'

export const productPriceSchema = z.object({
  value: z.number(),
  currencyCode: z.string().max(3).optional(),
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
  url: z.string().url().or(z.string().startsWith('/')),
  alt: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

export const productVariantSchema = z.object({
  id: z.string(),
  sku: z.string().nullish(),
  name: z.string().optional(),
  options: z.array(productOptionSchema),
  image: productImageSchema.optional(),
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  descriptionHtml: z.string().optional(),
  sku: z.string().nullish(),
  slug: z.string(),
  path: z.string().startsWith('/'),
  images: z.array(productImageSchema),
  variants: z.array(productVariantSchema),
  price: productPriceSchema,
  options: z.array(productOptionSchema),
  vendor: z.string().optional(),
})

export const productsPathsSchema = z.array(
  z.object({ path: z.string().startsWith('/') })
)

export const searchProductBodySchema = z.object({
  search: z.string().optional(),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  sort: z.string().optional(),
  locale: z.string().optional(),
})

export const searchProductsSchema = z.object({
  products: z.array(productSchema),
  found: z.boolean(),
})

import { z } from 'zod'

export const productInputSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().min(10).max(2000),
  priceCentsUSD: z.number().int().positive(),
  category: z.string().min(2).max(60),
  images: z.array(z.string().url()).min(1).max(8)
})

export type ProductInput = z.infer<typeof productInputSchema>



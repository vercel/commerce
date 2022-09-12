import { z } from 'zod'

export const siteInfoSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      path: z.string().startsWith('/'),
    })
  ),
  brands: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      path: z.string().startsWith('/'),
    })
  ),
})

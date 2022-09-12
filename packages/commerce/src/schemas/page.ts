import { z } from 'zod'

export const pageSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().startsWith('/').optional(),
  body: z.string(),
  is_visible: z.boolean().optional(),
  sort_order: z.number().optional(),
})

export const pagesPathsSchema = z.array(
  z.object({
    page: z.object({
      path: z.string().startsWith('/'),
    }),
  })
)

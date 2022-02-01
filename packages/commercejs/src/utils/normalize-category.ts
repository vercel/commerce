import type { Category } from '@vercel/commerce/types/site'
import type { Category as CommercejsCategory } from '@chec/commerce.js/types/category'

export function normalizeCategory(
  commercejsCatgeory: CommercejsCategory
): Category {
  const { id, name, slug } = commercejsCatgeory
  return {
    id,
    name,
    slug,
    path: slug,
  }
}

import { CommerceError } from "@vercel/commerce/utils/errors";
import { SwellCategory } from "../types/site";

export const getSubCategories = (
  categoryId: string,
  categories: SwellCategory[]
) => {
  const result: SwellCategory[] = []
  const queue: string[] = [categoryId]
  while (queue.length > 0) {
    const curr = queue.shift()!
    const category = categories.find((c) => c.id === curr)
    if (!category) {
      throw new CommerceError({
        message: `Category ${category} not found.`
      })
    }
    result.push(category)
    queue.push(...(category.children?.results.map((c) => c.id) ?? []))
  }
  return result
}
import getSortVariables from './get-sort-variables'
import type { SearchProductsInput } from '../product/use-search'

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
}: SearchProductsInput) => {
  let query = ''
  let tagIdsParam = {}

  if (search) {
    query += `product_type:${search} OR title:${search} OR tag:${search}`
  }

  if (brandId) {
    query += `${search ? ' AND ' : ''}vendor:${brandId}`
  }

  if (categoryId) {
    tagIdsParam = {
      tagIds: [categoryId],
    }
  }

  return {
    // categoryId,
    // query,
    ...tagIdsParam,
    ...getSortVariables(sort, !!categoryId),
  }
}

export default getSearchVariables

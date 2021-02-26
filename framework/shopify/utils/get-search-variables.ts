import getSortVariables from './get-sort-variables'
import type { SearchProductsInput } from '../product/use-search'

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
}: SearchProductsInput) => {
  let query = ''

  if (search) {
    query += `product_type:${search} OR title:${search} OR tag:${search}`
  }

  if (brandId) {
    query += `${search ? ' AND ' : ''}vendor:${brandId}`
  }

  return {
    categoryId,
    query,
    ...getSortVariables(sort, !!categoryId),
  }
}

export default getSearchVariables

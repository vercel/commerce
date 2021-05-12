import getSortVariables from './get-sort-variables'
import type { SearchProductsInput } from '../product/use-search'

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
}: SearchProductsInput) => {
  let searchQuery = ''
  let tagIdsParam = {}

  if (search) {
    searchQuery += search
  }

  if (brandId) {
    searchQuery += `${search ? ' ' : ''}${brandId}`
  }

  if (categoryId) {
    tagIdsParam = {
      tagIds: [categoryId],
    }
  }

  return {
    searchQuery,
    ...tagIdsParam,
    ...getSortVariables(sort, !!categoryId),
  }
}

export default getSearchVariables

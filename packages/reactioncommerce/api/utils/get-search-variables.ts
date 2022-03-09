import getSortVariables from './get-sort-variables'

export type SearchProductsInput = {
  search?: string
  categoryId?: number | string
  brandId?: number
  sort?: string
  locale?: string
}

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

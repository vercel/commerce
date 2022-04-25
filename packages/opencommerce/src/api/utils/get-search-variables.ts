export type SearchProductsInput = {
  search?: string
  categoryId?: number | string
  brandId?: number | string
  locale?: string
}

const getSearchVariables = ({
  brandId,
  search,
  categoryId,
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
  }
}

export default getSearchVariables

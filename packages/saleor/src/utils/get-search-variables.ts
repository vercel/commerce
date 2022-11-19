import { getSortVariables } from './get-sort-variables'
import type { SearchProductsInput } from '../product/use-search'

export const getSearchVariables = ({
  brandId,
  search,
  categoryId,
  sort,
}: SearchProductsInput) => {
  const sortBy = {
    field: 'NAME',
    direction: 'ASC',
    ...getSortVariables(sort, !!categoryId),
    channel: 'default-channel',
  }
  return {
    categoryId,
    filter: { search },
    sortBy,
  }
}

export default getSearchVariables

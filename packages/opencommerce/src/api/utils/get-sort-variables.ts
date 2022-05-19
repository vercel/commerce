type SortByField = 'minPrice' | 'featured' | 'createdAt'

const getSortVariables = (sort?: string) => {
  if (!sort) return null
  const [_sort, direction] = sort.split('-')

  const SORT: { [key: string]: SortByField | undefined } = {
    price: 'minPrice',
    trending: 'featured',
    latest: 'createdAt',
  }

  const sortValue = SORT[_sort]

  if (sortValue && direction) {
    return {
      sortBy: sortValue,
      sortOrder: direction,
    }
  }

  return null
}

export default getSortVariables

const getSortVariables = (sort?: string, isCategory: boolean = false) => {
  let output = {}
  switch (sort) {
    case 'price-asc':
      output = {
        sortKey: 'PRICE',
        reverse: false,
      }
      break
    case 'price-desc':
      output = {
        sortKey: 'PRICE',
        reverse: true,
      }
      break
    case 'trending-desc':
      output = {
        sortKey: 'BEST_SELLING',
        reverse: false,
      }
      break
    case 'latest-desc':
      output = {
        sortKey: isCategory ? 'CREATED' : 'CREATED_AT',
        reverse: true,
      }
      break
  }
  return output
}

export default getSortVariables

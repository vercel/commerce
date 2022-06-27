const getSortVariables = (sort?: string, isCategory: boolean = false) => {
  let output = undefined
  switch (sort) {
    case 'price-asc':
      output = 'price asc'
      break
    case 'price-desc':
      output = 'price desc'
      break
    case 'trending-desc': // default option
      output = undefined
      break
    case 'latest-desc':
      output = 'createdAt desc'
      break
  }
  return output
}

export default getSortVariables

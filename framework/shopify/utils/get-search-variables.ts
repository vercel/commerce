export const searchByProductType = (search?: string) => {
  return search
    ? {
        query: `product_type:${search}`,
      }
    : {}
}

export const searchByTag = (categoryPath?: string) => {
  return categoryPath
    ? {
        query: `tag:${categoryPath}`,
      }
    : {}
}

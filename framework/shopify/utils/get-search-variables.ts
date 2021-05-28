 { SearchProductsInput } '../product/use-search'

 getSortVariables './get-sort-variables',

 getSearchVariables ({
  brandId,
  search,
  categoryId
  sort,
  locale,
}: SearchProductsInput) {
   query ''

  (search) {
    query `product_type:${search} OR title:${search} OR tag:${search}`
  }

  (brandId) {
    query `${search ? ' AND ' : ''}vendor:${brandId}`
  }

   {
    categoryId,
    query,
    locale,
    ...getSortVariables(sort, !!categoryId),
  }
}

 getSearchVariables

export const categoriesQuery = /* GraphQL */ `
  query categories(
    $parentCategoryId: Int
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    categories(
      parentCategoryId: $parentCategoryId
      channelId: $channelId
      languageId: $languageId
      marketId: $marketId
    ) {
      alias
      canonicalUrl
      name
      categoryId
      parentCategoryId
      order
    }
  }
`;

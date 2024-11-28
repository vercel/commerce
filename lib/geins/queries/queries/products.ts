import listProductFragment from '../fragments/list-product';

export const productsQuery = /* GraphQL */ `
  query products(
    $skip: Int = null
    $take: Int = null
    $categoryAlias: String = null
    $brandAlias: String = null
    $discountCampaignAlias: String = null
    $url: String = null
    $filter: FilterInputType = null
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    products(
      skip: $skip
      take: $take
      categoryAlias: $categoryAlias
      brandAlias: $brandAlias
      discountCampaignAlias: $discountCampaignAlias
      url: $url
      filter: $filter
      channelId: $channelId
      languageId: $languageId
      marketId: $marketId
    ) {
      products {
        brand {
          name
        }
        ...ListProduct
      }
      count
    }
  }
  ${listProductFragment}
`;

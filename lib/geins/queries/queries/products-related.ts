//import relatedProductFragment from './fragments/related-product';
// ${relatedProductFragment}
import priceFragment from '../fragments/price';
import skuFragment from '../fragments/sku';

export const relatedProductsQuery = /* GraphQL */ `
  query relatedProducts(
    $alias: String!
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    relatedProducts(
      alias: $alias
      channelId: $channelId
      languageId: $languageId
      marketId: $marketId
    ) {
      alias
      name
      canonicalUrl
      brand {
        name
      }
      unitPrice {
        ...Price
      }
      relationType
      productImages {
        fileName
      }
      primaryImage
      primaryCategory {
        name
      }
      skus {
        ...Sku
      }
    }
  }
  ${priceFragment}
  ${skuFragment}
`;

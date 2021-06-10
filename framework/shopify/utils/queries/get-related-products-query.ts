import { listProductDetailsFragment } from './get-all-products-query'

const getRelatedProductsQuery = /* GraphQL */ `
  query getRelatedProducts($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...listProductDetails
    }
  }
  ${listProductDetailsFragment}
`
export default getRelatedProductsQuery

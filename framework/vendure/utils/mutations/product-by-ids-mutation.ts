export const productByIdsMutation = /* GraphQL */ `
query productByIds($input: ProductByIdsInput!) {
  productByIds(input: $input) {
    id
    name
    description
    slug
    collections{
      id
      name
    }
    facetValues{
      id
      name
    }
    variants{
      id
      name
      currencyCode
      price
      priceWithTax
    }
    featuredAsset{
      preview
    }
  }
}
`

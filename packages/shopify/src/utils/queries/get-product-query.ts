const getProductQuery = /* GraphQL */ `
  query getProductBySlug(
    $slug: String!
    $withMetafields: [HasMetafieldsIdentifier!] = []
  ) {
    productByHandle(handle: $slug) {
      id
      handle
      availableForSale
      title
      productType
      vendor
      description
      descriptionHtml
      options {
        id
        name
        values
      }
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 25) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            sku
            availableForSale
            requiresShipping
            selectedOptions {
              name
              value
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 25) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      media(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            ... on Model3d {
              sources {
                url
                format
              }
            }
          }
        }
      }
      metafields(identifiers: $withMetafields) {
        key
        value
        namespace
        description
        type
      }
    }
  }
`

export default getProductQuery

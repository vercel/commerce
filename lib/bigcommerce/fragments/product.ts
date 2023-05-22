const productOptionFragment = /* GraphQL */ `
  fragment productOption on CatalogProductOption {
    __typename
    entityId
    displayName
    isRequired
    ... on MultipleChoiceOption {
      displayStyle
      values(first: 5) {
        edges {
          node {
            entityId
            isDefault
            ... on SwatchOptionValue {
              hexColors
              imageUrl(width: 200)
              label
              isSelected
            }
            ... on MultipleChoiceOptionValue {
              entityId
              label
              isSelected
            }
            ... on ProductPickListOptionValue {
              entityId
              label
              isSelected
            }
          }
        }
      }
    }
    ... on NumberFieldOption {
      entityId
      displayName
    }
    ... on TextFieldOption {
      entityId
      displayName
    }
    ... on MultiLineTextFieldOption {
      entityId
      displayName
    }
    ... on FileUploadFieldOption {
      entityId
      displayName
    }
    ... on DateFieldOption {
      entityId
      displayName
    }
    ... on CheckboxOption {
      entityId
      displayName
    }
  }
`;

const productVariantFragment = /* GraphQL */ `
  fragment productVariant on Variant {
    id
    entityId
    sku
    upc
    isPurchasable
    prices {
      price {
        value
        currencyCode
      }
      priceRange {
        min {
          value
          currencyCode
        }
        max {
          value
          currencyCode
        }
      }
    }
    options(first: 5) {
      edges {
        node {
          entityId
          displayName
          values(first: 5) {
            edges {
              node {
                entityId
                label
              }
            }
          }
        }
      }
    }
  }
`;

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    entityId
    sku
    upc
    name
    brand {
      name
    }
    plainTextDescription
    description
    availabilityV2 {
      status
      description
    }
    defaultImage {
      ...ImageFields
    }
    images {
      edges {
        node {
          ...ImageFields
        }
      }
    }
    seo {
      pageTitle
      metaDescription
      metaKeywords
    }
    prices {
      price {
        ...MoneyFields
      }
      priceRange {
        min {
          ...MoneyFields
        }
        max {
          ...MoneyFields
        }
      }
    }
    createdAt {
      utc
    }
    variants(first: 5) {
      edges {
        node {
          ...productVariant
        }
      }
    }
    productOptions(first: 3) {
      edges {
        node {
          ...productOption
        }
      }
    }
  }
  fragment ImageFields on Image {
    url: url(width: 320)
    altText
  }
  fragment MoneyFields on Money {
    value
    currencyCode
  }
  ${productOptionFragment}
  ${productVariantFragment}
`;

export { productOptionFragment, productVariantFragment, productFragment };

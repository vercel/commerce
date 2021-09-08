export const productPrices = /* GraphQL */`
fragment productPrices on Product {
      price {
        price
        salePrice
      }
      priceRange {
        lower { price, salePrice}
        upper { price, salePrice }
      }
    }
`;
export const productAttributes = /* GraphQL */`
fragment productAttributes on Product {
  properties {
    attributeFQN
    attributeDetail {
      name
    }
    isHidden
    values {
      value
      stringValue
    }
 }
}
`;
export const productContent = /* GraphQL */`
fragment productContent on Product {
  content {
    productFullDescription
    productShortDescription
    seoFriendlyUrl
    productName
    productImages {
      imageUrl
      imageLabel
      mediaType
    }
  }
}
`;
export const productOptions = /* GraphQL */`
fragment productOptions on Product {
  options {
    attributeFQN
    attributeDetail {
      name
    }
    isProductImageGroupSelector
    isRequired
    isMultiValue
    values {
      value
      isSelected
      deltaPrice
      stringValue
    }
  }
}
`;
export const productInfo = /* GraphQL */`
fragment productInfo on Product {
        productCode
        productUsage

        purchasableState {
          isPurchasable
        }

        variations {
          productCode,
          options {          
            __typename
            attributeFQN
            value 
          }
        }
        
        categories {
          categoryCode
          categoryId
          content { 
            name 
            slug
          }
        }
        
        ...productPrices
        ...productAttributes
        ...productContent
        ...productOptions
}
${productPrices}
${productAttributes}
${productContent}
${productOptions}
`;

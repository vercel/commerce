export const cartCommon = `
  _id
  createdAt
  account {
    _id
    emailRecords {
      address
    }
  }
  shop {
    _id
    currency {
      code
    }
  }
  email
  updatedAt
  expiresAt
  checkout {
    fulfillmentGroups {
      _id
      type
      data {
        shippingAddress {
          address1
          address2
          city
          company
          country
          fullName
          isBillingDefault
          isCommercial
          isShippingDefault
          phone
          postal
          region
        }
      }
      availableFulfillmentOptions {
        price {
          amount
          displayAmount
        }
        fulfillmentMethod {
          _id
          name
          displayName
        }
      }
      selectedFulfillmentOption {
        fulfillmentMethod {
          _id
          name
          displayName
        }
        price {
          amount
          displayAmount
        }
        handlingPrice {
          amount
          displayAmount
        }
      }
      shop {
        _id
      }
      shippingAddress {
        address1
        address2
        city
        company
        country
        fullName
        isBillingDefault
        isCommercial
        isShippingDefault
        phone
        postal
        region
      }
    }
    summary {
      fulfillmentTotal {
        displayAmount
      }
      itemTotal {
        amount
        displayAmount
      }
      surchargeTotal {
        amount
        displayAmount
      }
      taxTotal {
        amount
        displayAmount
      }
      total {
        amount
        currency {
          code
        }
        displayAmount
      }
    }
  }
  totalItemQuantity
`

const cartItemConnectionFragment = `
  pageInfo {
    hasNextPage
    endCursor
  }
  edges {
    node {
      _id
      productConfiguration {
        productId
        productVariantId
      }
      addedAt
      attributes {
        label
        value
      }
      createdAt
      isBackorder
      isLowQuantity
      isSoldOut
      imageURLs {
        large
        small
        original
        medium
        thumbnail
      }
      metafields {
        value
        key
      }
      parcel {
        length
        width
        weight
        height
      }
      price {
        amount
        displayAmount
        currency {
          code
        }
      }
      priceWhenAdded {
        amount
        displayAmount
        currency {
          code
        }
      }
      productSlug
      productType
      quantity
      shop {
        _id
      }
      subtotal {
        displayAmount
      }
      title
      productTags {
        nodes {
          name
        }
      }
      productVendor
      variantTitle
      optionTitle
      updatedAt
      inventoryAvailableToSell
    }
  }
`

export const cartPayloadFragment = `
  ${cartCommon}
  items {
    ${cartItemConnectionFragment}
  }
`

export const incorrectPriceFailureDetailsFragment = `
  currentPrice {
    amount
    currency {
      code
    }
    displayAmount
  }
  productConfiguration {
    productId
    productVariantId
  }
  providedPrice {
    amount
    currency {
      code
    }
    displayAmount
  }
`

export const minOrderQuantityFailureDetailsFragment = `
  minOrderQuantity
  productConfiguration {
    productId
    productVariantId
  }
  quantity
`

const getCartQuery = /* GraphQL */ `
  query($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ${cartCommon}
      }
    }
  }
`

export const cartQueryFragment = `
  ${cartCommon}
  items(first: 20, after: $itemsAfterCursor) {
    ${cartItemConnectionFragment}
  }
`

export default getCartQuery

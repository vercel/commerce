//https://shopify.dev/docs/api/customer/2024-01/queries/customer
export const CUSTOMER_ME_QUERY = /* GraphQL */ `
  query customer {
    customer {
      emailAddress {
        emailAddress
      }
      firstName
      lastName
      tags
    }
  }
`;

const CUSTOMER_FRAGMENT = `#graphql
  fragment OrderCard on Order {
    id
    number
    processedAt
    financialStatus
    fulfillments(first: 1) {
      nodes {
        status
      }
    }
    totalPrice {
      amount
      currencyCode
    }
    lineItems(first: 2) {
      edges {
        node {
          title
          image {
            altText
            height
            url
            width
          }
        }
      }
    }
  }

  fragment AddressPartial on CustomerAddress {
    id
    formatted
    firstName
    lastName
    company
    address1
    address2
    territoryCode
    zoneCode
    city
    zip
    phoneNumber
  }

  fragment CustomerDetails on Customer {
    firstName
    lastName
    phoneNumber {
      phoneNumber
    }
    emailAddress {
      emailAddress
    }
    defaultAddress {
      ...AddressPartial
    }
    addresses(first: 6) {
      edges {
        node {
          ...AddressPartial
        }
      }
    }
    orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          ...OrderCard
        }
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const CUSTOMER_DETAILS_QUERY = `#graphql
  query CustomerDetails {
    customer {
      ...CustomerDetails
    }
  }
  ${CUSTOMER_FRAGMENT}
` as const;

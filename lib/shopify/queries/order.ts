import lineItemFragment from '../fragments/line-item';
import { orderMetafields } from '../fragments/order';

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const getCustomerOrderQuery = /* GraphQL */ `
  query getCustomerOrderQuery($orderId: ID!) {
    customer {
      emailAddress {
        emailAddress
      }
      displayName
    }
    order(id: $orderId) {
      ... on Order {
        id
        ...Order
        customer {
          id
          emailAddress {
            emailAddress
            marketingState
          }
          firstName
          lastName
          phoneNumber {
            phoneNumber
            marketingState
          }
          imageUrl
          displayName
        }
      }
    }
  }

  fragment Order on Order {
    id
    name
    confirmationNumber
    processedAt
    cancelledAt
    currencyCode
    transactions {
      ...OrderTransaction
    }
    billingAddress {
      ...Address
    }
    shippingAddress {
      ...Address
    }
    fulfillments(first: 20, sortKey: CREATED_AT, reverse: true, query: "NOT status:CANCELLED") {
      edges {
        node {
          id
          ...Fulfillment
        }
      }
    }
    lineItems(first: 50) {
      nodes {
        id
        ...LineItem
      }
    }
    totalPrice {
      ...Price
    }
    subtotal {
      ...Price
    }
    totalShipping {
      ...Price
    }
    totalTax {
      ...Price
    }
    financialStatus
    totalRefunded {
      ...Price
    }
    refunds {
      id
      createdAt
    }
    paymentInformation {
      paymentCollectionUrl
      ...OrderPaymentInformation
    }
    requiresShipping
    note
    shippingLine {
      title
      originalPrice {
        ...Price
      }
    }
  }

  fragment OrderTransaction on OrderTransaction {
    id
    processedAt
    paymentIcon {
      id
      url
      altText
    }
    paymentDetails {
      ... on CardPaymentDetails {
        last4
        cardBrand
      }
    }
    transactionAmount {
      presentmentMoney {
        ...Price
      }
    }
    giftCardDetails {
      last4
      balance {
        ...Price
      }
    }
    status
    kind
    transactionParentId
    type
    typeDetails {
      name
      message
    }
  }

  fragment Price on MoneyV2 {
    amount
    currencyCode
  }

  fragment Address on CustomerAddress {
    id
    address1
    address2
    firstName
    lastName
    provinceCode: zoneCode
    city
    zip
    countryCodeV2: territoryCode
    company
    phone: phoneNumber
  }

  fragment Fulfillment on Fulfillment {
    id
    status
    createdAt
    estimatedDeliveryAt
    trackingInformation {
      number
      company
      url
    }
    requiresShipping
    fulfillmentLineItems(first: 20) {
      nodes {
        id
        quantity
        lineItem {
          id
          name
          title
          presentmentTitle
          sku
          image {
            id
            url
            altText
          }
        }
      }
    }
    events(first: 20, sortKey: HAPPENED_AT, reverse: true) {
      edges {
        node {
          id
          ...FulfillmentEvent
        }
      }
    }
  }

  fragment FulfillmentEvent on FulfillmentEvent {
    status
    happenedAt
  }

  fragment OrderPaymentInformation on OrderPaymentInformation {
    paymentStatus
    totalPaidAmount {
      ...Price
    }
    totalOutstandingAmount {
      ...Price
    }
    paymentTerms {
      id
      overdue
      nextDueAt
      paymentSchedules(first: 2) {
        nodes {
          id
          dueAt
          completed
          amount {
            ...Price
          }
        }
      }
    }
  }
  ${lineItemFragment}
`;

export const getOrderMetafieldsQuery = /* GraphQL */ `
  query getOrderMetafields($id: ID!) {
    order(id: $id) {
      ...OrderMetafield
    }
  }
  ${orderMetafields}
`;

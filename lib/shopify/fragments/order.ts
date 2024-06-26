import lineItemFragment from './line-item';

const orderCard = /* GraphQL */ `
  fragment OrderCard on Order {
    id
    number
    name
    processedAt
    createdAt
    financialStatus
    fulfillments(first: 1) {
      edges {
        node {
          status
        }
      }
    }
    totalPrice {
      amount
      currencyCode
    }
    lineItems(first: 20) {
      nodes {
        ...LineItem
      }
    }
  }
  ${lineItemFragment}
`;

export const orderMetafields = /* GraphQL */ `
  fragment OrderMetafield on Order {
    id
    warrantyStatus: metafield(namespace: "custom", key: "warranty_status") {
      value
    }
    warrantyActivationDeadline: metafield(
      namespace: "custom"
      key: "warranty_activation_deadline"
    ) {
      value
    }
  }
`;

export default orderCard;

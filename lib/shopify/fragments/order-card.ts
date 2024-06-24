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

export default orderCard;

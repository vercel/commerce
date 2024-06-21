const orderCard = /* GraphQL */ `
  fragment OrderCard on Order {
    id
    number
    name
    processedAt
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
      edges {
        node {
          title
          quantity
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
`;

export default orderCard;

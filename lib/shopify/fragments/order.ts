import addressFragment from './address';
import lineItemFragment from './line-item';
import orderMetafieldsFragment from './order-metafields';
import orderTrasactionFragment from './order-transaction';
import priceFragment from './price';

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
    shippingLine {
      title
      originalPrice {
        ...Price
      }
    }
    lineItems(first: 20) {
      nodes {
        ...LineItem
      }
    }
    shippingAddress {
      ...Address
    }
    billingAddress {
      ...Address
    }
    transactions {
      ...OrderTransaction
    }
    ...OrderMetafields
  }
  ${lineItemFragment}
  ${addressFragment}
  ${priceFragment}
  ${orderTrasactionFragment}
  ${orderMetafieldsFragment}
`;

export default orderCard;

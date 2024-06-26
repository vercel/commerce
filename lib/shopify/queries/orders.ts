import customerDetailsFragment from '../fragments/customer-details';
import { orderMetafields } from '../fragments/order';

const customerFragment = `#graphql
`;

// NOTE: https://shopify.dev/docs/api/customer/latest/queries/customer
export const getCustomerOrdersQuery = `#graphql
  query getCustomerOrdersQuery {
    customer {
      ...CustomerDetails
    }
  }
  ${customerFragment}
  ${customerDetailsFragment}
`;

export const getCustomerOrderMetafieldsQuery = /* GraphQL */ `
  query getCustomerOrderMetafields($id: ID!) {
    customer(id: $id) {
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          ...OrderMetafield
        }
      }
    }
  }
  ${orderMetafields}
`;

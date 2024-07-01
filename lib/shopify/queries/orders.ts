import customerDetailsFragment from '../fragments/customer-details';

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

import customerAddress from './customer-address';
import orderCard from './order-card';

const customerDetailsFragment = /* GraphQL */ `
  ${customerAddress}
  ${orderCard}

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
      ...CustomerAddress
    }
    addresses(first: 6) {
      edges {
        node {
          ...CustomerAddress
        }
      }
    }
    orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
      edges {
        node {
          ...OrderCard
        }
      }
    }
  }
`;
export default customerDetailsFragment;

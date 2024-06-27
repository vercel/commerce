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
      id
      key
    }
    warrantyActivationDeadline: metafield(
      namespace: "custom"
      key: "warranty_activation_deadline"
    ) {
      value
      id
      key
    }
    warrantyActivationOdometer: metafield(
      namespace: "custom"
      key: "warranty_activation_odometer"
    ) {
      value
      id
      key
    }
    warrantyActivationInstallation: metafield(
      namespace: "custom"
      key: "warranty_activation_installation"
    ) {
      value
      id
      key
    }
    warrantyActivationSelfInstall: metafield(
      namespace: "custom"
      key: "warranty_activation_self_install"
    ) {
      value
      id
      key
    }
    warrantyActivationVIN: metafield(namespace: "custom", key: "warranty_activation_vin") {
      value
      id
      key
    }
    warrantyActivationMileage: metafield(namespace: "custom", key: "warranty_activation_mileage") {
      value
      id
      key
    }
  }
`;

export default orderCard;

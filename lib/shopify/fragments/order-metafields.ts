const orderMetafieldsFragment = /* GraphQL */ `
  fragment OrderMetafields on Order {
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
    orderConfirmation: metafield(namespace: "custom", key: "customer_confirmation") {
      value
      id
      key
    }
    coreReturnStatus: metafield(namespace: "custom", key: "core_status") {
      value
      id
      key
    }
    coreReturnDeadline: metafield(namespace: "custom", key: "core_return_deadline") {
      value
      id
      key
    }
    coreReturnName: metafield(namespace: "custom", key: "core_return_name") {
      value
      id
      key
    }
    coreReturnEmail: metafield(namespace: "custom", key: "core_return_email") {
      value
      id
      key
    }
    coreReturnPhone: metafield(namespace: "custom", key: "core_return_phone") {
      value
      id
      key
    }
    coreReturnAddress: metafield(namespace: "custom", key: "core_return_address") {
      value
      id
      key
    }
    coreReturnCity: metafield(namespace: "custom", key: "core_return_city") {
      value
      id
      key
    }
    coreReturnState: metafield(namespace: "custom", key: "core_return_state") {
      value
      id
      key
    }
    coreReturnZip: metafield(namespace: "custom", key: "core_return_zip") {
      value
      id
      key
    }
  }
`;

export default orderMetafieldsFragment;

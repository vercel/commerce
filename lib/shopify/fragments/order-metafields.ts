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
    }
    coreReturnStatus: metafield(namespace: "custom", key: "core_status") {
      value
    }
    coreReturnDeadline: metafield(namespace: "custom", key: "core_return_deadline") {
      value
    }
    coreReturnName: metafield(namespace: "custom", key: "core_return_name") {
      value
    }
    coreReturnEmail: metafield(namespace: "custom", key: "core_return_email") {
      value
    }
    coreReturnPhone: metafield(namespace: "custom", key: "core_return_phone") {
      value
    }
    coreReturnAddress: metafield(namespace: "custom", key: "core_return_address") {
      value
    }
    coreReturnCity: metafield(namespace: "custom", key: "core_return_city") {
      value
    }
    coreReturnState: metafield(namespace: "custom", key: "core_return_state") {
      value
    }
    coreReturnZip: metafield(namespace: "custom", key: "core_return_zip") {
      value
    }
  }
`;

export default orderMetafieldsFragment;

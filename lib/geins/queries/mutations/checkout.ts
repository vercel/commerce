export const checkoutMutation = /* GraphQL */ `
  mutation createOrUpdateCheckout(
    $cartId: String!
    $checkout: CheckoutInputType
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    createOrUpdateCheckout(
      cartId: $cartId
      checkout: $checkout
      channelId: $channelId
      languageId: $languageId
      marketId: $marketId
    ) {
      paymentOptions {
        paymentData
      }
    }
  }
`;

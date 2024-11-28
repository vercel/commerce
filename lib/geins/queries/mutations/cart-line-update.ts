import cartFragment from '../fragments/cart';

export const cartUpdateMutation = /* GraphQL */ `
  mutation updateCartItem(
    $id: String!
    $item: CartItemInputType!
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    updateCartItem(
      id: $id
      item: $item
      channelId: $channelId
      languageId: $languageId
      marketId: $marketId
    ) {
      ...Cart
    }
  }
  ${cartFragment}
`;

import cartFragment from '../fragments/cart';

export const cartAddMutation = /* GraphQL */ `
  mutation addToCart(
    $id: String!
    $item: CartItemInputType!
    $channelId: String
    $languageId: String
    $marketId: String
  ) {
    addToCart(
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

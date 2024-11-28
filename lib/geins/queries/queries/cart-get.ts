import cartFragment from '../fragments/cart';

export const cartGetQuery = /* GraphQL */ `
  query getCart($id: String, $channelId: String, $languageId: String, $marketId: String) {
    getCart(id: $id, channelId: $channelId, languageId: $languageId, marketId: $marketId) {
      ...Cart
    }
  }
  ${cartFragment}
`;

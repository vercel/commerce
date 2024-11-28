import cartFragment from '../fragments/cart';

export const cartCreateQuery = /* GraphQL */ `
  query getCart($channelId: String, $languageId: String, $marketId: String) {
    getCart(channelId: $channelId, languageId: $languageId, marketId: $marketId) {
      ...Cart
    }
  }
  ${cartFragment}
`;

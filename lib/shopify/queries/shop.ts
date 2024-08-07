import shopFragment from '../fragments/shop';

export const getShopQuery = /* GraphQL */ `
  query getShop {
    shop {
      ...shop
    }
  }
  ${shopFragment}
`;

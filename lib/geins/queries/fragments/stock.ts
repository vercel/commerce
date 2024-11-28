const stockFragment = /* GraphQL */ `
  fragment Stock on StockType {
    inStock
    oversellable
    totalStock
    static
    incoming
  }
`;
export default stockFragment;

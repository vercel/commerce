import stockFragment from './stock';
const skuFragment = /* GraphQL */ `
  fragment Sku on SkuType {
    skuId
    gtin
    name
    productId
    stock {
      ...Stock
    }
  }
  ${stockFragment}
`;
export default skuFragment;

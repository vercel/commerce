import stockFragment from './stock';
const variantFragment = /* GraphQL */ `
  fragment Variant on VariantType {
    alias
    level
    attributes {
      key
      value
    }
    label
    value
    dimension
    skuId
    productId
    stock {
      ...Stock
    }
    primaryImage
  }
  ${stockFragment}
`;
export default variantFragment;

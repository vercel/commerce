import priceFragment from './price';
import stockFragment from './stock';

const listProductFragment = /* GraphQL */ `
  fragment ListProduct on ProductType {
    brand {
      name
      alias
    }
    name
    productId
    articleNumber
    alias
    canonicalUrl
    unitPrice {
      ...Price
    }
    productImages {
      fileName
    }
    primaryCategory {
      name
      alias
    }
    totalStock {
      ...Stock
    }
  }
  ${priceFragment}
  ${stockFragment}
`;
export default listProductFragment;

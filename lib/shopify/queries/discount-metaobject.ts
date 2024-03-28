import discountMetaobject from '../fragments/discount-metaobject';

export const getDiscountMetaobjectsQuery = /* GraphQL */ `
  query getDiscountMetaobjects {
    metaobjects(type: "dynamic_discount", first: 10) {
      edges {
        node {
          ...metaobject
        }
      }
    }
  }
  ${discountMetaobject}
`;

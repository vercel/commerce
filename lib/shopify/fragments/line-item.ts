const lineItemFragment = /* GraphQL */ `
  fragment LineItem on LineItem {
    title
    image {
      altText
      height
      url
      width
    }
    price {
      amount
      currencyCode
    }
    quantity
    sku
    totalPrice {
      amount
      currencyCode
    }
    variantTitle
    id
  }
`;

export default lineItemFragment;

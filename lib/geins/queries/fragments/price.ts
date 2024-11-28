const priceFragment = /* GraphQL */ `
  fragment Price on PriceType {
    isDiscounted
    regularPriceIncVatFormatted
    sellingPriceIncVatFormatted
    regularPriceExVatFormatted
    sellingPriceExVatFormatted
    sellingPriceIncVat
    sellingPriceExVat
    regularPriceIncVat
    regularPriceExVat
    vat
    discountPercentage
  }
`;
export default priceFragment;

export const getEligibleShippingMethods = /* GraphQL */ `
query getEligibleShippingMethods {
  eligibleShippingMethods {
    id
    name
    description
    price
    priceWithTax
    metadata
    __typename
  }
}
`

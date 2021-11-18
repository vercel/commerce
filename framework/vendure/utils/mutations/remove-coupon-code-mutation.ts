export const removeCouponCodeMutation = /* GraphQL */ `
mutation removeCouponCode($couponCode: String!) {
  removeCouponCode(couponCode: $couponCode) {
    __typename
    ... on Order {
      id
      createdAt
      updatedAt
      discounts {
        type
        amount
        amountWithTax
        description
      }
    }
  }
}
`

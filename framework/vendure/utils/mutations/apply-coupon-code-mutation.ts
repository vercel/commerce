export const applyCouponCodeMutation = /* GraphQL */ `
mutation applyCouponCode($couponCode: String!) {
  applyCouponCode(couponCode: $couponCode) {
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
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
`
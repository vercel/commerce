export const setShippingMethodMutation = /* GraphQL */ `
mutation SetShippingMethod($id: ID!) {
  setOrderShippingMethod(shippingMethodId: $id) {
    ...Cart
    ...ErrorResult
    __typename
  }
}

fragment Cart on Order {
  id
  code
  state
  active
  shippingLines {
    priceWithTax
    shippingMethod {
      id
      code
      name
      description
      __typename
    }
    __typename
  }

  __typename
}

fragment ErrorResult on ErrorResult {
  errorCode
  message
  __typename
}
`

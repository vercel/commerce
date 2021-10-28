export const eligiblePaymentMethodsQuery = /* GraphQL */ `
query eligiblePaymentMethods {
  eligiblePaymentMethods{
    __typename
    id
    code
    name
    description
    isEligible
    eligibilityMessage
  }
}
`

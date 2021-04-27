import { cartPayloadFragment } from '@framework/utils/queries/get-checkout-query'

const reconcileCartsMutation = `
  mutation reconcileCartsMutation($input: ReconcileCartsInput!) {
    reconcileCarts(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default reconcileCartsMutation

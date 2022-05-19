import { cartPayloadFragment } from '../queries/get-cart-query'

const selectFulfillmentOptions = /* GraphQL */ `
  mutation setFulfillmentOptionCartMutation(
    $input: SelectFulfillmentOptionForGroupInput!
  ) {
    selectFulfillmentOptionForGroup(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`
export default selectFulfillmentOptions

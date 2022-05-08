import { cartPayloadFragment } from '../queries/get-cart-query'

const updateFulfillmentOptions = /* GraphQL */ `
  mutation updateFulfillmentOptionsForGroup(
    $input: UpdateFulfillmentOptionsForGroupInput!
  ) {
    updateFulfillmentOptionsForGroup(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default updateFulfillmentOptions

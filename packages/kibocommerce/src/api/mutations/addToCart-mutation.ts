import { cartItemDetails } from './../fragments/cartItemDetails'

const addToCurrentCartMutation = /*GraphQL*/ `
${cartItemDetails}

mutation addToCart($productToAdd:CartItemInput!){
    addItemToCurrentCart(cartItemInput: $productToAdd) {
      ...cartItemDetails
    }
}`

export default addToCurrentCartMutation

const updateCartItemQuantityMutation = /*GraphQL*/`
mutation updateCartItemQuantity($itemId:String!, $quantity: Int!){
    updateCurrentCartItemQuantity(cartItemId:$itemId, quantity:$quantity){
      id
      quantity
    }
}`;

export default updateCartItemQuantityMutation;

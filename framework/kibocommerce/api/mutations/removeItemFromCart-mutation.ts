/*
* Delete cart based on current user session
*/
const removeItemFromCartMutation = /*GraphQL*/`
mutation deleteCartItem($id: String!) {
    deleteCurrentCartItem(cartItemId:$id)
}`;

export default removeItemFromCartMutation;

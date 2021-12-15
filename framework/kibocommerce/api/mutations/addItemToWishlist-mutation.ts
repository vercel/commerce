import {productDetails} from '../fragments/productDetails'
const addItemToWishlistMutation = /* GraphQL */`
  mutation createWishlistItem(
    $wishlistId: String!
    $wishlistItemInput: WishlistItemInput
  ) {
    createWishlistItem(
      wishlistId: $wishlistId
      wishlistItemInput: $wishlistItemInput
    ) {
      id
      quantity
      product {
        ...productDetails
      }
    }
  }
${productDetails}
`;

export default addItemToWishlistMutation;

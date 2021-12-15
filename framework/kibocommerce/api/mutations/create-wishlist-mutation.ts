const createWishlist = /*GraphQL*/`
mutation createWishlist($wishlistInput:WishlistInput!) {
    createWishlist(wishlistInput:$wishlistInput){
      id
      name
      customerAccountId
    }
  }
`;

export default createWishlist;
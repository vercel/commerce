import {productDetails} from '../fragments/productDetails'
export const getCustomerWishlistQuery= /* GraphQL */`
query wishlist($customerId: Int!, $wishlistName: String!) {
    customerWishlist(customerAccountId:$customerId ,wishlistName: $wishlistName){
      customerAccountId
      name
      id
      userId
      items {
       id
        quantity
        total
        subtotal
        unitPrice{
          extendedAmount
        }
        quantity
        product {
          ...productDetails
      }
    } 
    }
  }
${productDetails}
`
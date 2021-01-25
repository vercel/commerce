export const cartFragment = /* GraphQL */ `
   fragment Cart on Order {
     id
     code
     totalQuantity
     subTotal
     subTotalWithTax
     total
     totalWithTax
     currencyCode
     lines {
       id
       quantity
       featuredAsset {
         id
         preview
       }
       productVariant {
         name
         product {
           slug
         }
         productId
       }
     }
   }
`

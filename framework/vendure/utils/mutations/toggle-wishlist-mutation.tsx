export const toggleWishlistMutation = /* GraphQL */ `
    mutation toggleFavorite($productId:ID!){
        toggleFavorite(productId:$productId){
            items{
                id
            }
        }
    }
`

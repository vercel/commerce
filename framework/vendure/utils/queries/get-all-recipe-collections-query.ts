export const getAllRecipeCollectionsQuery = /* GraphQL */ `
query recipeCollection {
recipeCollections{
    __typename
    items{
    __typename
    id
    name
    slug
    recipes{
        items{
        id
        slug
        }
    }
    }
}
}

`

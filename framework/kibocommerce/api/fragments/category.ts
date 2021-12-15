export const CategoryInfo = /* GraphQL */`
fragment categoryInfo on PrCategory {
    categoryId
    categoryCode
    isDisplayed
    content {
        name
        slug
        description
    }
}`;
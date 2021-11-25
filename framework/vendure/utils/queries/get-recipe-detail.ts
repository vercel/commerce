export const getRecipeDetailQuery = /* GraphQL */ `
query getRecipe($slug: String) {
  recipe(slug: $slug) {
    id
    featuredAsset {
      preview
    }
    title
    slug
    description
    content
    time
    people
    country
    createdAt
    updatedAt
    collections {
      id
      name
      slug
    }
    facetValues {
      id
      name
    }
    recommendedRecipes {
      id
      title
      slug
      description
      featuredAsset {
        preview
      }
    }
    ingredients {
      quantity
      productVariant {
        id
        name
        priceWithTax
        currencyCode
        featuredAsset {
          id
          preview
        }
        product {
          id
          slug
          name
          featuredAsset {
            id
            preview
          }
          collections {
            id
            name
            slug
          }
        }
      }
    }
  }
}

`
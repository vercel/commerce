export const getRecipeByProductSlugQuery = /* GraphQL */ `
query recipeByProductSlug($slug: String, $options: RecipeListOptions) {
  recipeByProductSlug(slug: $slug, options: $options) {
    items {
      id
      title
        slug
        description
        content
        people
        time
        country
      assets {
        name
        preview
      }
      featuredAsset {
        preview
      }
      
      ingredients {
        id
        quantity
        productVariant {
          id
          name
          assets {
            preview
          }
          featuredAsset {
            preview
          }
          priceWithTax
          currencyCode
          product {
            id
            slug
            name
            collections {
              id
              name
            }
            facetValues {
              id
              code
              name
            }
            featuredAsset {
              preview
            }
          }
        }
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
    }
  }
}

`

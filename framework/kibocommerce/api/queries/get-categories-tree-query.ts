import { CategoryInfo } from '../fragments/category'

export const categoryTreeQuery = /* GraphQL */`
query GetCategoryTree {
    categories: categoriesTree {
      items {
        ...categoryInfo
        childrenCategories {
            ...categoryInfo
            childrenCategories {
                ...categoryInfo
                childrenCategories {
                    ...categoryInfo
                    childrenCategories {
                        ...categoryInfo
                        childrenCategories {
                            ...categoryInfo
                            childrenCategories {
                                ...categoryInfo
                            }
                        }
                    }
                }
            }
        }
      }
    }
}
${CategoryInfo}`;
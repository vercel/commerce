export const getCategoryQuery = /* GraphQL */ `
  query getCategory($entityId: Int!) {
    site {
      category(entityId: $entityId) {
        entityId
        name
        path
        description
        seo {
          metaDescription
          metaKeywords
          pageTitle
        }
      }
    }
  }
`;

export const getStoreCategoriesQuery = /* GraphQL */ `
  query getStoreCategories {
    site {
      categoryTree {
        entityId
        name
      }
    }
  }
`;

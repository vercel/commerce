import { productFragment } from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query productById($productId: Int!) {
    site {
      product(entityId: $productId) {
        ...product
      }
    }
  }
  ${productFragment}
`;

export const getProductsCollectionQuery = /* GraphQL */ `
  query getProductsCollection(
    $entityId: Int!
    $sortBy: CategoryProductSort
    $hideOutOfStock: Boolean
    $first: Int
  ) {
    site {
      category(entityId: $entityId) {
        products(sortBy: $sortBy, hideOutOfStock: $hideOutOfStock, first: $first) {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getStoreProductsQuery = /* GraphQL */ `
  query getStoreProducts($first: Int, $entityIds: [number!]) {
    site {
      products(first: $first, entityIds: $entityIds) {
        edges {
          node {
            ...product
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const searchProductsQuery = /* GraphQL */ `
  query searchProducts($filters: searchProductsFiltersInput!, $sort: searchProductsSortInput) {
    site {
      search {
        searchProducts(filters: $filters, sort: $sort) {
          products {
            edges {
              node {
                ...product
              }
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductsRecommedationsQuery = /* GraphQL */ `
  query getProductsRecommedations($entityId: Int) {
    site {
      product(entityId: $entityId) {
        relatedProducts {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
  }
  ${productFragment}
`;

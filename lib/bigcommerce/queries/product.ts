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
  query searchProducts($filters: SearchProductsFiltersInput!, $sort: SearchProductsSortInput) {
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
  query getProductsRecommedations($productId: ID) {
    site {
      product(id: $productId) {
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

export const getNewestProductsQuery = /* GraphQL */ `
  query getNewestProducts($first: Int) {
    site {
      newestProducts(first: $first) {
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

export const getFeaturedProductsQuery = /* GraphQL */ `
  query getFeaturedProducts($first: Int) {
    site {
      featuredProducts(first: $first) {
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

export const getPopularProductsQuery = /* GraphQL */ `
  query bestSellingProducts($first: Int) {
    site {
      bestSellingProducts(first: $first) {
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

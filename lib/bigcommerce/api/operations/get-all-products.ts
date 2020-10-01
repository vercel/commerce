import type {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
} from "lib/bigcommerce/schema";
import type { RecursivePartial, RecursiveRequired } from "../types";
import { getConfig, Images, ProductImageVariables } from "..";

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 10
    $imgSmallWidth: Int = 320
    $imgSmallHeight: Int
    $imgMediumWidth: Int = 640
    $imgMediumHeight: Int
    $imgLargeWidth: Int = 960
    $imgLargeHeight: Int
    $imgXLWidth: Int = 1280
    $imgXLHeight: Int
  ) {
    site {
      products(first: $first) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId
            name
            path
            brand {
              name
            }
            description
            prices {
              price {
                value
                currencyCode
              }
              salePrice {
                value
                currencyCode
              }
            }
            images {
              edges {
                node {
                  urlSmall: url(width: $imgSmallWidth, height: $imgSmallHeight)
                  urlMedium: url(
                    width: $imgMediumWidth
                    height: $imgMediumHeight
                  )
                  urlLarge: url(width: $imgLargeWidth, height: $imgLargeHeight)
                  urlXL: url(width: $imgXLWidth, height: $imgXLHeight)
                }
              }
            }
            variants {
              edges {
                node {
                  entityId
                  defaultImage {
                    urlSmall: url(
                      width: $imgSmallWidth
                      height: $imgSmallHeight
                    )
                    urlMedium: url(
                      width: $imgMediumWidth
                      height: $imgMediumHeight
                    )
                    urlLarge: url(
                      width: $imgLargeWidth
                      height: $imgLargeHeight
                    )
                    urlXL: url(width: $imgXLWidth, height: $imgXLHeight)
                  }
                }
              }
            }
            options {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                  values {
                    edges {
                      node {
                        entityId
                        label
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export interface GetAllProductsResult<T> {
  products: T extends GetAllProductsQuery
    ? NonNullable<T["site"]["products"]["edges"]>
    : unknown;
}

export type ProductVariables = Images &
  Omit<GetAllProductsQueryVariables, keyof ProductImageVariables>;

async function getAllProducts(opts?: {
  query?: string;
  variables?: ProductVariables;
}): Promise<GetAllProductsResult<GetAllProductsQuery>>;

async function getAllProducts<T, V = any>(opts: {
  query: string;
  variables?: V;
}): Promise<GetAllProductsResult<T>>;

async function getAllProducts({
  query = getAllProductsQuery,
  variables: vars,
}: {
  query?: string;
  variables?: ProductVariables;
} = {}): Promise<GetAllProductsResult<GetAllProductsQuery>> {
  const config = getConfig();
  const variables: GetAllProductsQueryVariables = {
    ...config.imageVariables,
    ...vars,
  };
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const data = await config.fetch<RecursivePartial<GetAllProductsQuery>>(
    query,
    { variables }
  );
  const products = data.site?.products?.edges;

  return {
    products: (products as RecursiveRequired<typeof products>) ?? [],
  };
}

export default getAllProducts;

import type {
  GetProductQuery,
  GetProductQueryVariables,
} from 'lib/bigcommerce/schema';
import type { RecursivePartial, RecursiveRequired } from '../utils/types';
import { productInfoFragment } from '../fragments/product';
import { BigcommerceConfig, getConfig, Images } from '..';

export const getProductQuery = /* GraphQL */ `
  query getProduct(
    $path: String!
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
      route(path: $path) {
        node {
          __typename
          ... on Product {
            ...productInfo
          }
        }
      }
    }
  }

  ${productInfoFragment}
`;

export interface GetProductResult<T> {
  product?: T extends GetProductQuery
    ? Extract<T['site']['route']['node'], { __typename: 'Product' }>
    : unknown;
}

export type ProductVariables = Images &
  ({ path: string; slug?: never } | { path?: never; slug: string });

async function getProduct(opts: {
  query?: string;
  variables: ProductVariables;
  config?: BigcommerceConfig;
}): Promise<GetProductResult<GetProductQuery>>;

async function getProduct<T, V = any>(opts: {
  query: string;
  variables: V;
  config?: BigcommerceConfig;
}): Promise<GetProductResult<T>>;

async function getProduct({
  query = getProductQuery,
  variables: { slug, ...vars },
  config = getConfig(),
}: {
  query?: string;
  variables: ProductVariables;
  config?: BigcommerceConfig;
}): Promise<GetProductResult<GetProductQuery>> {
  const variables: GetProductQueryVariables = {
    ...config.imageVariables,
    ...vars,
    path: slug ? `/${slug}/` : vars.path!,
  };
  const data = await config.fetch<RecursivePartial<GetProductQuery>>(query, {
    variables,
  });
  const product = data.site?.route?.node;

  if (product?.__typename === 'Product') {
    return {
      product: product as RecursiveRequired<typeof product>,
    };
  }

  return {};
}

export default getProduct;

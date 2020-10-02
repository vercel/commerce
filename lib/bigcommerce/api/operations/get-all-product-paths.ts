import type { GetAllProductPathsQuery } from 'lib/bigcommerce/schema';
import type { RecursivePartial, RecursiveRequired } from '../utils/types';
import { BigcommerceConfig, getConfig } from '..';

export const getAllProductPathsQuery = /* GraphQL */ `
  query getAllProductPaths {
    site {
      products {
        edges {
          node {
            path
          }
        }
      }
    }
  }
`;

export interface GetAllProductPathsResult<T> {
  products: T extends GetAllProductPathsQuery
    ? NonNullable<T['site']['products']['edges']>
    : unknown;
}

async function getAllProductPaths(opts?: {
  query?: string;
  config?: BigcommerceConfig;
}): Promise<GetAllProductPathsResult<GetAllProductPathsQuery>>;

async function getAllProductPaths<T, V = any>(opts: {
  query: string;
  config?: BigcommerceConfig;
}): Promise<GetAllProductPathsResult<T>>;

async function getAllProductPaths({
  query = getAllProductPathsQuery,
  config = getConfig(),
}: {
  query?: string;
  config?: BigcommerceConfig;
} = {}): Promise<GetAllProductPathsResult<GetAllProductPathsQuery>> {
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const data = await config.fetch<RecursivePartial<GetAllProductPathsQuery>>(
    query
  );
  const products = data.site?.products?.edges;

  return {
    products: (products as RecursiveRequired<typeof products>) ?? [],
  };
}

export default getAllProductPaths;

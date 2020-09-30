import {
  CommerceAPI,
  CommerceAPIOptions,
  CommerceAPIFetchOptions,
} from 'lib/commerce/api';
import { GetAllProductsQuery } from '../schema';
import { getAllProductsQuery } from './operations/get-all-products';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface GetAllProductsResult<T> {
  products: T extends GetAllProductsQuery
    ? T['site']['products']['edges']
    : unknown;
}

export default class BigcommerceAPI implements CommerceAPI {
  commerceUrl: string;
  apiToken: string;

  constructor({ commerceUrl, apiToken }: CommerceAPIOptions) {
    this.commerceUrl = commerceUrl;
    this.apiToken = apiToken;
  }

  async fetch<T>(
    query: string,
    { variables, preview }: CommerceAPIFetchOptions = {}
  ): Promise<T> {
    const res = await fetch(this.commerceUrl + (preview ? '/preview' : ''), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error('Failed to fetch API');
    }
    return json.data;
  }

  async getAllProducts<T>(opts: {
    query: string;
  }): Promise<GetAllProductsResult<T>>;

  async getAllProducts(opts?: {
    query?: string;
  }): Promise<GetAllProductsResult<GetAllProductsQuery>>;

  async getAllProducts({
    query = getAllProductsQuery,
  }: { query?: string } = {}): Promise<
    GetAllProductsResult<RecursivePartial<GetAllProductsQuery>>
  > {
    const data = await this.fetch<RecursivePartial<GetAllProductsQuery>>(query);

    return {
      products: data?.site?.products?.edges,
    };
  }
}

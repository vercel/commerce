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
  protected commerceUrl: string;
  protected apiToken: string;

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
  async getAllProducts<T = GetAllProductsQuery>({
    query,
  }: { query?: string } = {}): Promise<
    GetAllProductsResult<T | GetAllProductsQuery>
    // T extends GetAllProductsQuery
    //   ? GetAllProductsResult<T['site']['products']['edges']>
    //   : Partial<GetAllProductsResult<any>>
  > {
    if (!query) {
      const data = await this.fetch<GetAllProductsQuery>(getAllProductsQuery);

      return {
        products: data.site.products.edges,
      };
    }

    return {
      products: undefined,
    };
  }
}

let h = new BigcommerceAPI({ apiToken: '', commerceUrl: '' });

async function yay() {
  const x = await h.getAllProducts<{ custom: 'val' }>({ query: 'yes' });
  const y = await h.getAllProducts();

  console.log(x.products);
}

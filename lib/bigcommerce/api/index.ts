import {
  CommerceAPI,
  CommerceAPIOptions,
  CommerceAPIFetchOptions,
} from 'lib/commerce/api';
import { GetAllProductsQuery, GetAllProductsQueryVariables } from '../schema';
import { getAllProductsQuery } from './operations/get-all-products';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface GetAllProductsResult<T> {
  products: T extends GetAllProductsQuery
    ? T['site']['products']['edges']
    : unknown;
}

export interface Images {
  small?: ImageOptions;
  medium?: ImageOptions;
  large?: ImageOptions;
  xl?: ImageOptions;
}

export interface ImageOptions {
  width: number;
  height?: number;
}

export interface BigcommerceAPIOptions extends CommerceAPIOptions {
  images?: Images;
}

export type ProductImageVariables = Pick<
  GetAllProductsQueryVariables,
  | 'imgSmallWidth'
  | 'imgSmallHeight'
  | 'imgMediumWidth'
  | 'imgMediumHeight'
  | 'imgLargeWidth'
  | 'imgLargeHeight'
  | 'imgXLWidth'
  | 'imgXLHeight'
>;

export type ProductVariables = Images &
  Omit<GetAllProductsQueryVariables, keyof ProductImageVariables>;

export default class BigcommerceAPI implements CommerceAPI {
  commerceUrl: string;
  apiToken: string;
  imageVariables?: ProductImageVariables;

  constructor({ commerceUrl, apiToken, images }: BigcommerceAPIOptions) {
    this.commerceUrl = commerceUrl;
    this.apiToken = apiToken;
    this.imageVariables = {
      imgSmallWidth: images?.small?.width,
      imgSmallHeight: images?.small?.height,
      imgMediumWidth: images?.medium?.height,
      imgMediumHeight: images?.medium?.height,
      imgLargeWidth: images?.large?.height,
      imgLargeHeight: images?.large?.height,
      imgXLWidth: images?.xl?.height,
      imgXLHeight: images?.xl?.height,
    };
  }

  async fetch<Q, V = any>(
    query: string,
    { variables, preview }: CommerceAPIFetchOptions<V> = {}
  ): Promise<Q> {
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

  async getAllProducts<T, V = any>(opts: {
    query: string;
    variables?: V;
  }): Promise<GetAllProductsResult<T>>;

  async getAllProducts(opts?: {
    query?: string;
    variables?: ProductVariables;
  }): Promise<GetAllProductsResult<GetAllProductsQuery>>;

  async getAllProducts({
    query = getAllProductsQuery,
    variables: vars,
  }: {
    query?: string;
    variables?: ProductVariables;
  } = {}): Promise<
    GetAllProductsResult<RecursivePartial<GetAllProductsQuery>>
  > {
    const variables: GetAllProductsQueryVariables = {
      ...this.imageVariables,
      ...vars,
    };
    const data = await this.fetch<RecursivePartial<GetAllProductsQuery>>(
      query,
      { variables }
    );

    return {
      products: data?.site?.products?.edges,
    };
  }
}

export interface CommerceAPIOptions {
  commerceUrl: string;
  apiToken: string;
}

export interface CommerceAPIFetchOptions<V> {
  variables?: V;
  preview?: boolean;
}

export interface CommerceAPI {
  commerceUrl: string;
  apiToken: string;

  fetch<Q, V = any>(
    query: string,
    queryData?: CommerceAPIFetchOptions<V>
  ): Promise<Q>;

  getAllProducts(options?: { query: string }): Promise<any>;
}

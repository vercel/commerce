export interface CommerceAPIOptions {
  commerceUrl: string;
  apiToken: string;
}

export interface CommerceAPIFetchOptions {
  variables?: object;
  preview?: boolean;
}

export interface CommerceAPI {
  commerceUrl: string;
  apiToken: string;

  fetch<T>(query: string, queryData?: CommerceAPIFetchOptions): Promise<T>;

  getAllProducts(options?: { query?: string }): Promise<any>;
}

// export default class CommerceAPI {
//   getAllProducts(query: string) {

//   }
// }

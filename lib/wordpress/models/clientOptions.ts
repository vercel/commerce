export declare type WCRestApiVersion = 'wp/v2';

export declare type WCRestApiEncoding = 'utf-8' | 'ascii';
export declare type WCRestApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export declare type WCRestApiEndpoint = 'posts' | string;

export declare type IWCRestApiQuery = Record<string, unknown>;

export type IWCCredentials = {
  /* Your API consumer key */
  consumerKey: string;
  /* 	Your API consumer secret */
  consumerSecret: string;
};

export type WCCommerceRestApiTypeFunctions = {
  get: <T>(endpoint: string, params?: T) => Promise<any>;
  post: <T>(endpoint: string, params?: T) => Promise<any>;
  put: <T>(endpoint: string, params?: T) => Promise<any>;
  delete: <T>(endpoint: string, params?: T) => Promise<any>;
};

export interface IWCRestApiOptions<T> extends IWCCredentials {
  /* Your Store URL, example: http://WC.dev/ */
  url: string;

  /* Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix filter` */
  wpAPIPrefix?: string;

  /* API version, default is `v3` */
  version?: WCRestApiVersion;

  /* Encoding, default is 'utf-8' */
  encoding?: WCRestApiEncoding;

  /* When `true` and using under HTTPS force Basic Authentication as query string, default is `false` */
  queryStringAuth?: boolean;

  /* Provide support for URLs with ports, eg: `8080` */
  port?: number;

  /* Provide support for custom timeout, eg: `5000` */
  timeout?: number;

  /* Define the custom Axios config, also override this library options */
  axiosConfig?: T;

  /* Version of this library */
  classVersion?: string;

  /* Https or Http */
  isHttps?: boolean;
}

export interface DELETE {
  id: number | string;
  force?: boolean | string;
}

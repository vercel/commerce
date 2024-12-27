export declare type WooRestApiVersion = 'wc/v3';
// | "wc/v2"
// | "wc/v1"
// | "wc-api/v3"
// | "wc-api/v2"
// | "wc-api/v1";
export declare type WooRestApiEncoding = 'utf-8' | 'ascii';
export declare type WooRestApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';

export declare type WooRestApiEndpoint =
  | 'coupons'
  | 'customers'
  | 'orders'
  | 'products'
  | 'products/attributes'
  | 'products/categories'
  | 'products/shipping_classes'
  | 'products/tags'
  | 'products/reviews'
  | 'system_status'
  | 'reports' // TODO: add support for reports
  | 'settings' // TODO: add support for settings
  | 'webhooks' // TODO: add support for webhooks
  | 'shipping' // TODO: add support for shipping
  | 'shipping_methods' // TODO: add support for shipping_methods
  | 'taxes' // TODO: add support for taxes
  | 'payment_gateways' // TODO: add support for payment_gateways
  | string; // I need to have next endpoint: "orders/<id>/notes"

export declare type IWooRestApiQuery = Record<string, unknown>;

export type IWooCredentials = {
  /* Your API consumer key */
  consumerKey: string;
  /* 	Your API consumer secret */
  consumerSecret: string;
};

export type WooCommerceRestApiTypeFunctions = {
  get: <T>(endpoint: string, params?: T) => Promise<any>;
  post: <T>(endpoint: string, params?: T) => Promise<any>;
  put: <T>(endpoint: string, params?: T) => Promise<any>;
  delete: <T>(endpoint: string, params?: T) => Promise<any>;
};

export interface IWooRestApiOptions<T> extends IWooCredentials {
  /* Your Store URL, example: http://woo.dev/ */
  url: string;

  /* Custom WP REST API URL prefix, used to support custom prefixes created with the `rest_url_prefix filter` */
  wpAPIPrefix?: string;

  /* API version, default is `v3` */
  version?: WooRestApiVersion;

  /* Encoding, default is 'utf-8' */
  encoding?: WooRestApiEncoding;

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

import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import crypto from 'node:crypto';
import OAuth from 'oauth-1.0a';
import Url from 'url-parse';
import { DELETE, IWooRestApiOptions, WooRestApiEndpoint, WooRestApiMethod } from './clientOptions';
import { Coupon, CouponsParams } from './coupon';
import { Customer, CustomersParams } from './customer';
import { Order, OrdersMainParams } from './orders';
import { Product, ProductMainParams } from './product';

/**
 * Set the axiosConfig property to the axios config object.
 * Could reveive any axios |... config objects.
 * @param {AxiosRequestConfig} axiosConfig
 */
export type WooRestApiOptions = IWooRestApiOptions<AxiosRequestConfig>;

/**
 * Set all the possible query params for the WooCommerce REST API.
 */
export type WooRestApiParams = CouponsParams &
  CustomersParams &
  OrdersMainParams &
  ProductMainParams &
  DELETE;

/**
 * Define the response types for each endpoint.
 */
type WooCommerceResponse<
  T extends WooRestApiEndpoint,
  P extends Partial<WooRestApiParams> = {}
> = P['id'] extends number | string
  ? T extends 'products'
    ? Product
    : T extends 'customers'
      ? Customer
      : T extends 'orders'
        ? Order
        : T extends 'coupons'
          ? Coupon
          : any
  : T extends 'products'
    ? Product[]
    : T extends 'customers'
      ? Customer[]
      : T extends 'orders'
        ? Order[]
        : T extends 'coupons'
          ? Coupon[]
          : any;

/**
 * WooCommerce REST API wrapper
 *
 * @param {Object} opt
 */
export default class WooCommerceRestApi<T extends WooRestApiOptions> {
  protected _opt: T;

  /**
   * Class constructor.
   *
   * @param {Object} opt
   */
  constructor(opt: T) {
    this._opt = opt;

    /**
     * If the class is not instantiated, return a new instance.
     * This is useful for the static methods.
     */
    if (!(this instanceof WooCommerceRestApi)) {
      return new WooCommerceRestApi(opt);
    }

    /**
     * Check if the url is defined.
     */
    if (!this._opt.url || this._opt.url === '') {
      throw new OptionsException('url is required');
    }

    /**
     * Check if the consumerKey is defined.
     */
    if (!this._opt.consumerKey || this._opt.consumerKey === '') {
      throw new OptionsException('consumerKey is required');
    }

    /**
     * Check if the consumerSecret is defined.
     */
    if (!this._opt.consumerSecret || this._opt.consumerSecret === '') {
      throw new OptionsException('consumerSecret is required');
    }

    /**
     * Set default options
     */
    this._setDefaultsOptions(this._opt);
  }

  /**
   * Set default options
   *
   * @param {Object} opt
   */
  _setDefaultsOptions(opt: T): void {
    this._opt.wpAPIPrefix = opt.wpAPIPrefix || 'wp-json';
    this._opt.version = opt.version || 'wc/v3';
    this._opt.isHttps = /^https/i.test(this._opt.url);
    this._opt.encoding = opt.encoding || 'utf-8';
    this._opt.queryStringAuth = opt.queryStringAuth || false;
    this._opt.classVersion = '0.0.2';
  }

  /**
   * Parse params to object.
   *
   * @param {Object} params
   * @param {Object} query
   * @return {Object} IWooRestApiQuery
   */
  // _parseParamsObject<T>(params: Record<string, T>, query: Record<string, any>): IWooRestApiQuery {
  //     for (const key in params) {
  //         if (typeof params[key] === "object") {
  //             // If the value is an object, loop through it and add it to the query object
  //             for (const subKey in params[key]) {
  //                 query[key + "[" + subKey + "]"] = params[key][subKey];
  //             }
  //         } else {
  //             query[key] = params[key]; // If the value is not an object, add it to the query object
  //         }
  //     }
  //     return query; // Return the query object
  // }

  /**
   * Normalize query string for oAuth 1.0a
   * Depends on the _parseParamsObject method
   *
   * @param  {String} url
   * @param  {Object} params
   *
   * @return {String}
   */
  _normalizeQueryString(url: string, params: Partial<Record<string, any>>): string {
    /**
     * Exit if url and params are not defined
     */
    if (url.indexOf('?') === -1 && Object.keys(params).length === 0) {
      return url;
    }
    const query = new Url(url, true).query; // Parse the query string returned by the url

    const values = [];

    let queryString = '';

    // Include params object into URL.searchParams.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const a = this._parseParamsObject(params, query);
    // console.log("A:", a);

    /**
     * Loop through the params object and push the key and value into the values array
     * Example: values = ['key1=value1', 'key2=value2']
     */
    for (const key in query) {
      values.push(key);
    }

    values.sort(); // Sort the values array

    for (const i in values) {
      /*
       * If the queryString is not empty, add an ampersand to the end of the string
       */
      if (queryString.length) queryString += '&';

      /**
       * Add the key and value to the queryString
       */
      queryString +=
        encodeURIComponent(values[i] || '') +
        '=' +
        encodeURIComponent(<string | number | boolean>(query[values[i] as string] ?? ''));
    }
    /**
     * Replace %5B with [ and %5D with ]
     */
    queryString = queryString.replace(/%5B/g, '[').replace(/%5D/g, ']');

    /**
     * Return the url with the queryString
     */
    const urlObject = url.split('?')[0] + '?' + queryString;

    return urlObject;
  }

  /**
   * Get URL
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {String}
   */
  _getUrl(endpoint: string, params: Partial<Record<string, unknown>>, version?: string): string {
    const api = this._opt.wpAPIPrefix + '/'; // Add prefix to endpoint

    let url = this._opt.url.slice(-1) === '/' ? this._opt.url : this._opt.url + '/';

    url = url + api + (version ?? this._opt.version) + '/' + endpoint;
    // Add id param to url
    if (params.id) {
      url = url + '/' + params.id;
      delete params.id;
    }

    const queryParams: string[] = [];
    for (const key in params) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string | number | boolean)}`
      );
    }

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }

    /**
     * If port is defined, add it to the url
     */
    if (this._opt.port) {
      const hostname = new Url(url).hostname;
      url = url.replace(hostname, hostname + ':' + this._opt.port);
    }

    /**
     * If isHttps is true, normalize the query string
     */
    // if (this._opt.isHttps) {
    //     url = this._normalizeQueryString(url, params);
    //     return url;
    // }

    return url;
  }

  /**
   * Create Hmac was deprecated fot this version at 16.11.2022
   * Get OAuth 1.0a since it is mandatory for WooCommerce REST API
   * You must use OAuth 1.0a "one-legged" authentication to ensure REST API credentials cannot be intercepted by an attacker.
   * Reference: https://woocommerce.github.io/woocommerce-rest-api-docs/#authentication-over-http
   * @return {Object}
   */
  _getOAuth(): OAuth {
    const data = {
      consumer: {
        key: this._opt.consumerKey,
        secret: this._opt.consumerSecret
      },
      signature_method: 'HMAC-SHA256',
      hash_function: (base: any, key: any) => {
        return crypto.createHmac('sha256', key).update(base).digest('base64');
      }
    };

    return new OAuth(data);
  }

  /**
   * Axios request
   * Mount the options to send to axios and send the request.
   *
   * @param  {String} method
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  _request<T extends WooRestApiEndpoint, P extends Partial<WooRestApiParams>>(
    method: WooRestApiMethod,
    endpoint: T,
    data?: Record<string, unknown>,
    params: P = {} as P,
    version?: string
  ): Promise<WooCommerceResponse<T, P>> {
    const url = this._getUrl(endpoint, params, version);
    const header: RawAxiosRequestHeaders = {
      Accept: 'application/json'
    };
    // only set "User-Agent" in node environment
    // the checking method is identical to upstream axios
    if (
      typeof process !== 'undefined' &&
      Object.prototype.toString.call(process) === '[object process]'
    ) {
      header['User-Agent'] = 'WooCommerce REST API - TS Client/' + this._opt.classVersion;
    }

    let options: AxiosRequestConfig = {
      url,
      method,
      responseEncoding: this._opt.encoding,
      timeout: this._opt.timeout,
      responseType: 'json',
      headers: { ...header },
      params: {},
      data: data ? JSON.stringify(data) : null
    };

    /**
     * If isHttps is false, add the query string to the params object
     */
    if (this._opt.isHttps) {
      if (this._opt.queryStringAuth) {
        options.params = {
          consumer_key: this._opt.consumerKey,
          consumer_secret: this._opt.consumerSecret
        };
      } else {
        options.auth = {
          username: this._opt.consumerKey,
          password: this._opt.consumerSecret
        };
      }

      options.params = { ...options.params, ...params };
    } else {
      options.params = this._getOAuth().authorize({
        url,
        method
      });
    }

    if (options.data) {
      options.headers = {
        ...header,
        'Content-Type': `application/json; charset=${this._opt.encoding}`
      };
    }

    // Allow set and override Axios options.
    options = { ...options, ...this._opt.axiosConfig };

    return axios(options).then((response) => response.data as WooCommerceResponse<T, P>);
  }

  /**
   * GET requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {Object}
   */
  get<T extends WooRestApiEndpoint, P extends Partial<WooRestApiParams>>(
    endpoint: T,
    params?: P
  ): Promise<WooCommerceResponse<T, P>> {
    return this._request('GET', endpoint, undefined, params || ({} as P));
  }

  /**
   * POST requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  post<T extends WooRestApiEndpoint>(
    endpoint: T,
    data: Record<string, unknown>,
    params?: Partial<WooRestApiParams>
  ): Promise<WooCommerceResponse<T>> {
    return this._request('POST', endpoint, data, params);
  }

  /**
   * PUT requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */
  put<T extends WooRestApiEndpoint>(
    endpoint: T,
    data: Record<string, unknown>,
    params?: Partial<WooRestApiParams>
  ): Promise<WooCommerceResponse<T>> {
    return this._request('PUT', endpoint, data, params);
  }

  /**
   * DELETE requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   * @param  {Object} params
   *
   * @return {Object}
   */
  delete<T extends WooRestApiEndpoint>(
    endpoint: T,
    data: Pick<WooRestApiParams, 'force'>,
    params: Pick<WooRestApiParams, 'id'>
  ): Promise<WooCommerceResponse<T, Pick<WooRestApiParams, 'id'>>> {
    return this._request('DELETE', endpoint, data, params);
  }

  /**
   * OPTIONS requests
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {Object}
   */
  options<T extends WooRestApiEndpoint>(
    endpoint: T,
    params?: Partial<WooRestApiParams>
  ): Promise<WooCommerceResponse<T>> {
    return this._request('OPTIONS', endpoint, {}, params);
  }
}

/**
 * Options Exception.
 */
export class OptionsException {
  public name: 'Options Error';
  public message: string;
  /**
   * Constructor.
   *
   * @param {String} message
   */
  constructor(message: string) {
    this.name = 'Options Error';
    this.message = message;
  }
}

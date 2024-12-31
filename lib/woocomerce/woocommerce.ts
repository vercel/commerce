import WooCommerceRestApi, { WooRestApiOptions } from './models/client';

const option: WooRestApiOptions = {
  url: process.env.WOOCOMMERCE_URL ?? 'http://wordpress.localhost',
  consumerKey:
    process.env.WOOCOMMERCE_CONSUMER_KEY ?? '',
  consumerSecret:
    process.env.WOOCOMMERCE_CONSUMER_SECRET ?? '',
  isHttps: false,
  version: 'wc/v3',
  queryStringAuth: false // Force Basic Authentication as query string true and using under
};
export const woocommerce = new WooCommerceRestApi(option);

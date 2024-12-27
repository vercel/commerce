import WooCommerceRestApi, { WooRestApiOptions } from './models/client';

const option: WooRestApiOptions = {
  url: process.env.WOOCOMMERCE_URL ?? 'http://wordpress.localhost',
  consumerKey:
    process.env.WOOCOMMERCE_CONSUMER_KEY ?? 'ck_1fb0a3c9b50ae813c31c7effc086a809d8416d90',
  consumerSecret:
    process.env.WOOCOMMERCE_CONSUMER_SECRET ?? 'cs_ee4f1c9e061d07a7cb6025b69d414189a9157e20',
  isHttps: false,
  version: 'wc/v3',
  queryStringAuth: false // Force Basic Authentication as query string true and using under
};
export const woocommerce = new WooCommerceRestApi(option);

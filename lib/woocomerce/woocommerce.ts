import WooCommerceRestApi, { WooRestApiOptions } from './models/client';

const option: WooRestApiOptions = {
  url: process.env.WOOCOMMERCE_URL ?? 'http://wordpress.localhost',
  consumerKey:
    process.env.WOOCOMMERCE_CONSUMER_KEY ?? 'ck_2307cad3b7ab10eb2c439fd8c50ef69740967768',
  consumerSecret:
    process.env.WOOCOMMERCE_CONSUMER_SECRET ?? 'cs_2e2e94e6b9507cca5f7080ff8f856ac84c7b72d5',
  isHttps: false,
  version: 'wc/v3',
  queryStringAuth: false // Force Basic Authentication as query string true and using under
};
export const woocommerce = new WooCommerceRestApi(option);

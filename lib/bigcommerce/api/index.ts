import { CommerceAPIConfig } from 'lib/commerce/api';
import { GetAllProductsQueryVariables } from '../schema';
import fetchAPI from './utils/fetch-api';

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

export interface BigcommerceConfigOptions extends CommerceAPIConfig {
  images?: Images;
}

export interface BigcommerceConfig extends BigcommerceConfigOptions {
  readonly imageVariables?: ProductImageVariables;
}

const API_URL = process.env.BIGCOMMERCE_STOREFRONT_API_URL;
const API_TOKEN = process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN;

if (!API_URL) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_URL is missing and it's required to access your store`
  );
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_TOKEN is missing and it's required to access your store`
  );
}

export class Config {
  private config: BigcommerceConfig;

  constructor(config: BigcommerceConfigOptions) {
    this.config = {
      ...config,
      get imageVariables() {
        const { images } = this;
        return images
          ? {
              imgSmallWidth: images.small?.width,
              imgSmallHeight: images.small?.height,
              imgMediumWidth: images.medium?.height,
              imgMediumHeight: images.medium?.height,
              imgLargeWidth: images.large?.height,
              imgLargeHeight: images.large?.height,
              imgXLWidth: images.xl?.height,
              imgXLHeight: images.xl?.height,
            }
          : undefined;
      },
    };
  }

  getConfig() {
    return this.config;
  }

  setConfig(newConfig: Partial<BigcommerceConfig>) {
    Object.assign(this.config, newConfig);
  }
}

const config = new Config({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  fetch: fetchAPI,
});

export function getConfig() {
  return config.getConfig();
}

export function setConfig(newConfig: Partial<BigcommerceConfig>) {
  return config.setConfig(newConfig);
}

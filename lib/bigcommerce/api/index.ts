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

export interface BigcommerceConfig extends CommerceAPIConfig {
  images?: Images;
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

const config: BigcommerceConfig = {
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  fetch: fetchAPI,
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

export function getConfig() {
  return config;
}

export function setConfig(newConfig: Partial<BigcommerceConfig>) {
  Object.assign(config, newConfig);
}

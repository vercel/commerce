const createAxiosFetcher = require('@spree/axios-fetcher/dist/server/index').default;
import { makeClient } from '@spree/storefront-api-v2-sdk/dist/client';

const spree = makeClient({
  host: 'http://localhost:3000',
  createFetcher: createAxiosFetcher
});

export default spree;

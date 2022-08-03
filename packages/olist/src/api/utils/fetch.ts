import {
  VndaServiceInstance,
  VndaServiceSingleton,
} from '@vnda/headless-framework'

export const client = (
  apiToken: string,
  shopHost: string
): VndaServiceSingleton => VndaServiceInstance(apiToken, { shopHost })

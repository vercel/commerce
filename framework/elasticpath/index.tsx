import {
  CommerceConfig,
  getCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'
import { elasticpathProvider } from './provider'
import type { ElasticpathProvider } from './provider'

export { elasticpathProvider }
export type { ElasticpathProvider }

export const CommerceProvider = getCommerceProvider(elasticpathProvider)
export const useCommerce = () => useCoreCommerce<ElasticpathProvider>()

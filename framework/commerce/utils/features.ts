import commerceProviderConfig from '../config.json'
import type { CommerceProviderConfig } from '../types'
import memo from 'lodash.memoize'

type FeaturesAPI = {
  isEnabled: (desideredFeature: string) => boolean
}

function isFeatureEnabled(config: CommerceProviderConfig) {
  const features = config.features
  return (desideredFeature: string) =>
    Object.keys(features)
      .filter((k) => features[k])
      .includes(desideredFeature)
}

export function toEnvConfig(
  configMap: CommerceProviderConfig['features']
): Map<string, boolean> {
  let toEnvConfigMap = new Map<string, boolean>()
  Object.keys(configMap).map((r) =>
    toEnvConfigMap.set(`${r.toUpperCase()}_ENABLED`, configMap[r])
  )
  return toEnvConfigMap
}

function boostrap(): FeaturesAPI {
  const basis = {
    isEnabled: () => false,
  }

  if (!commerceProviderConfig) {
    console.log('No config.json found - Please add a config.json')
    return basis
  }

  if (commerceProviderConfig.features) {
    return {
      ...basis,
      isEnabled: memo(isFeatureEnabled(commerceProviderConfig)),
    }
  }

  return basis
}

export default boostrap()

import MissingConfigurationValueError from '../errors/MissingConfigurationValueError'
import type { NonUndefined, ValueOf } from '../types'

const requireConfig = <T>(isomorphicConfig: T, key: keyof T) => {
  const valueUnderKey = isomorphicConfig[key]

  if (typeof valueUnderKey === 'undefined') {
    throw new MissingConfigurationValueError(
      `Value for configuration key ${key.toString()} was undefined.`
    )
  }

  return valueUnderKey as NonUndefined<ValueOf<T>>
}

export default requireConfig

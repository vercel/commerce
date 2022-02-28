import type { NonUndefined, UnknownObjectValues } from '../types'
import MisconfigurationError from '../errors/MisconfigurationError'
import isServer from './is-server'

const generateMisconfigurationErrorMessage = (
  keys: Array<string | number | symbol>
) => `${keys.join(', ')} must have a value before running the Framework.`

const forceIsomorphicConfigValues = <
  X extends keyof T,
  T extends UnknownObjectValues,
  H extends Record<X, NonUndefined<T[X]>>
>(
  config: T,
  requiredServerKeys: string[],
  requiredPublicKeys: X[]
) => {
  if (isServer) {
    const missingServerConfigValues = requiredServerKeys.filter(
      (requiredServerKey) => typeof config[requiredServerKey] === 'undefined'
    )

    if (missingServerConfigValues.length > 0) {
      throw new MisconfigurationError(
        generateMisconfigurationErrorMessage(missingServerConfigValues)
      )
    }
  }

  const missingPublicConfigValues = requiredPublicKeys.filter(
    (requiredPublicKey) => typeof config[requiredPublicKey] === 'undefined'
  )

  if (missingPublicConfigValues.length > 0) {
    throw new MisconfigurationError(
      generateMisconfigurationErrorMessage(missingPublicConfigValues)
    )
  }

  return config as T & H
}

export default forceIsomorphicConfigValues

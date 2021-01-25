import { useMemo } from 'react'
import { responseInterface } from 'swr'
import { CommerceError } from './errors'
import { Override } from './types'

export type UseResponseOptions<
  D,
  R extends responseInterface<any, CommerceError>
> = {
  descriptors?: PropertyDescriptorMap
  normalizer?: (data: R['data']) => D
}

export type UseResponse = <D, R extends responseInterface<any, CommerceError>>(
  response: R,
  options: UseResponseOptions<D, R>
) => D extends object ? Override<R, { data?: D }> : R

const useResponse: UseResponse = (response, { descriptors, normalizer }) => {
  const memoizedResponse = useMemo(
    () =>
      Object.create(response, {
        ...descriptors,
        ...(normalizer
          ? {
              data: {
                get() {
                  return response.data && normalizer(response.data)
                },
                enumerable: true,
              },
            }
          : {}),
      }),
    [response]
  )
  return memoizedResponse
}

export default useResponse

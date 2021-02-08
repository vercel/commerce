import useSWR, { ConfigInterface, responseInterface } from 'swr'
import type {
  HookHandler,
  HookInput,
  HookFetcher,
  PickRequired,
  Fetcher,
} from './types'
import defineProperty from './define-property'
import { CommerceError } from './errors'
import { useCommerce } from '..'

export type SwrOptions<Data, Input = null, Result = any> = ConfigInterface<
  Data,
  CommerceError,
  HookFetcher<Data, Input, Result>
>

export type ResponseState<Result> = responseInterface<Result, CommerceError> & {
  isLoading: boolean
}

export type UseData = <
  Data = any,
  Input = [...any],
  FetchInput = unknown,
  Result = any,
  Body = any
>(
  options: PickRequired<
    HookHandler<Data, Input, FetchInput, Result, Body>,
    'fetcher'
  >,
  input: HookInput,
  fetcherFn: Fetcher<any>
) => ResponseState<Data>

const useData: UseData = (options, input, fetcherFn) => {
  const fetcher = async (
    url?: string,
    query?: string,
    method?: string,
    ...args: any[]
  ) => {
    try {
      return await options.fetcher({
        options: { url, query, method },
        // Transform the input array into an object
        input: args.reduce((obj, val, i) => {
          obj[input[i][0]!] = val
          return obj
        }, {}),
        fetch: fetcherFn,
        normalize: options.normalizer,
      })
    } catch (error) {
      // SWR will not log errors, but any error that's not an instance
      // of CommerceError is not welcomed by this hook
      if (!(error instanceof CommerceError)) {
        console.error(error)
      }
      throw error
    }
  }
  const response = useSWR(
    () => {
      const opts = options.fetchOptions
      return opts
        ? [opts.url, opts.query, opts.method, ...input.map((e) => e[1])]
        : null
    },
    fetcher,
    options.swrOptions
  )

  if (!('isLoading' in response)) {
    defineProperty(response, 'isLoading', {
      get() {
        return response.data === undefined
      },
      enumerable: true,
    })
  }

  return response
}

export default useData

import useSWR, { responseInterface } from 'swr'
import type {
  HookHandler,
  HookSwrInput,
  HookFetchInput,
  PickRequired,
  Fetcher,
  SwrOptions,
} from './types'
import defineProperty from './define-property'
import { CommerceError } from './errors'

export type ResponseState<Result> = responseInterface<Result, CommerceError> & {
  isLoading: boolean
}

export type UseData = <
  Data = any,
  Input extends { [k: string]: unknown } = {},
  FetchInput extends HookFetchInput = {},
  Result = any,
  Body = any
>(
  options: PickRequired<
    HookHandler<Data, Input, FetchInput, Result, Body>,
    'fetcher'
  >,
  input: HookFetchInput | HookSwrInput,
  fetcherFn: Fetcher,
  swrOptions?: SwrOptions<Data, FetchInput, Result>
) => ResponseState<Data>

const useData: UseData = (options, input, fetcherFn, swrOptions) => {
  const hookInput = Array.isArray(input) ? input : Object.entries(input)
  const fetcher = async (
    url: string,
    query?: string,
    method?: string,
    ...args: any[]
  ) => {
    try {
      return await options.fetcher({
        options: { url, query, method },
        // Transform the input array into an object
        input: args.reduce((obj, val, i) => {
          obj[hookInput[i][0]!] = val
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
        ? [opts.url, opts.query, opts.method, ...hookInput.map((e) => e[1])]
        : null
    },
    fetcher,
    swrOptions
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

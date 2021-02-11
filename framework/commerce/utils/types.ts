import type { ConfigInterface } from 'swr'
import type { CommerceError } from './errors'
import type { ResponseState } from './use-data'

export type Override<T, K> = Omit<T, keyof K> & K

/**
 * Returns the properties in T with the properties in type K changed from optional to required
 */
export type PickRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

/**
 * Core fetcher added by CommerceProvider
 */
export type Fetcher<T = any, B = any> = (
  options: FetcherOptions<B>
) => T | Promise<T>

export type FetcherOptions<Body = any> = {
  url?: string
  query?: string
  method?: string
  variables?: any
  body?: Body
}

export type HookFetcher<Data, Input = null, Result = any> = (
  options: HookFetcherOptions | null,
  input: Input,
  fetch: <T = Result, Body = any>(options: FetcherOptions<Body>) => Promise<T>
) => Data | Promise<Data>

export type HookFetcherFn<
  Data,
  Input = never,
  Result = any,
  Body = any
> = (context: {
  options: HookFetcherOptions
  input: Input
  fetch: <T = Result, B = Body>(options: FetcherOptions<B>) => Promise<T>
  normalize?(data: Result): Data
}) => Data | Promise<Data>

export type HookFetcherOptions = { method?: string } & (
  | { query: string; url?: string }
  | { query?: string; url: string }
)

export type HookInputValue = string | number | boolean | undefined

export type HookSwrInput = [string, HookInputValue][]

export type HookFetchInput = { [k: string]: HookInputValue }

export type HookInput = {}

export type HookHandler<
  // Data obj returned by the hook and fetch operation
  Data,
  // Input expected by the hook
  Input extends { [k: string]: unknown } = {},
  // Input expected before doing a fetch operation
  FetchInput extends HookFetchInput = {},
  // Data returned by the API after a fetch operation
  Result = any,
  // Body expected by the API endpoint
  Body = any,
  // Custom state added to the response object of SWR
  State = {}
> = {
  useHook?(context: {
    input: Input & { swrOptions?: SwrOptions<Data, FetchInput, Result> }
    useData(context?: {
      input?: HookFetchInput | HookSwrInput
      swrOptions?: SwrOptions<Data, FetchInput, Result>
    }): ResponseState<Data>
  }): ResponseState<Data> & State
  fetchOptions: HookFetcherOptions
  fetcher?: HookFetcherFn<Data, FetchInput, Result, Body>
  normalizer?(data: NonNullable<Result>): Data
}

export type SwrOptions<Data, Input = null, Result = any> = ConfigInterface<
  Data,
  CommerceError,
  HookFetcher<Data, Input, Result>
>

/**
 * Returns the property K from type T excluding nullables
 */
export type Prop<T, K extends keyof T> = NonNullable<T[K]>

export type UseHookParameters<H extends HookHandler<any>> = Parameters<
  Prop<H, 'useHook'>
>

export type UseHookResponse<H extends HookHandler<any>> = ReturnType<
  Prop<H, 'useHook'>
>

export type UseHookInput<
  H extends HookHandler<any>
> = UseHookParameters<H>[0]['input']

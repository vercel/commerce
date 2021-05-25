import type { ConfigInterface } from 'swr'
import type { CommerceError } from './errors'
import type { ResponseState } from './use-data'

/**
 * Returns the properties in T with the properties in type K, overriding properties defined in T
 */
export type Override<T, K> = Omit<T, keyof K> & K

/**
 * Returns the properties in T with the properties in type K changed from optional to required
 */
export type PickRequired<T, K extends keyof T> = Omit<T, K> &
  {
    [P in K]-?: NonNullable<T[P]>
  }

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

export type HookFetcherFn<Data, Input = undefined, Result = any, Body = any> = (
  context: HookFetcherContext<Input, Result, Body>
) => Data | Promise<Data>

export type HookFetcherContext<Input = undefined, Result = any, Body = any> = {
  options: HookFetcherOptions
  input: Input
  fetch: <T = Result, B = Body>(options: FetcherOptions<B>) => Promise<T>
}

export type HookFetcherOptions = { method?: string } & (
  | { query: string; url?: string }
  | { query?: string; url: string }
)

export type HookInputValue = string | number | boolean | undefined

export type HookSWRInput = [string, HookInputValue][]

export type HookFetchInput = { [k: string]: HookInputValue }

export type HookFunction<
  Input extends { [k: string]: unknown } | null,
  T
> = keyof Input extends never
  ? () => T
  : Partial<Input> extends Input
  ? (input?: Input) => T
  : (input: Input) => T

export type SWRHook<
  // Data obj returned by the hook and fetch operation
  Data,
  // Input expected by the hook
  Input extends { [k: string]: unknown } = {},
  // Input expected before doing a fetch operation
  FetchInput extends HookFetchInput = {},
  // Custom state added to the response object of SWR
  State = {}
> = {
  useHook(
    context: SWRHookContext<Data, FetchInput>
  ): HookFunction<
    Input & { swrOptions?: SwrOptions<Data, FetchInput> },
    ResponseState<Data> & State
  >
  fetchOptions: HookFetcherOptions
  fetcher?: HookFetcherFn<Data, FetchInput>
}

export type SWRHookContext<
  Data,
  FetchInput extends { [k: string]: unknown } = {}
> = {
  useData(context?: {
    input?: HookFetchInput | HookSWRInput
    swrOptions?: SwrOptions<Data, FetchInput>
  }): ResponseState<Data>
}

export type MutationHook<
  // Data obj returned by the hook and fetch operation
  Data,
  // Input expected by the hook
  Input extends { [k: string]: unknown } = {},
  // Input expected by the action returned by the hook
  ActionInput extends { [k: string]: unknown } = {},
  // Input expected before doing a fetch operation
  FetchInput extends { [k: string]: unknown } = ActionInput
> = {
  useHook(
    context: MutationHookContext<Data, FetchInput>
  ): HookFunction<Input, HookFunction<ActionInput, Data | Promise<Data>>>
  fetchOptions: HookFetcherOptions
  fetcher?: HookFetcherFn<Data, FetchInput>
}

export type MutationHookContext<
  Data,
  FetchInput extends { [k: string]: unknown } | null = {}
> = {
  fetch: keyof FetchInput extends never
    ? () => Data | Promise<Data>
    : Partial<FetchInput> extends FetchInput
    ? (context?: { input?: FetchInput }) => Data | Promise<Data>
    : (context: { input: FetchInput }) => Data | Promise<Data>
}

export type SwrOptions<Data, Input = null, Result = any> = ConfigInterface<
  Data,
  CommerceError,
  HookFetcher<Data, Input, Result>
>

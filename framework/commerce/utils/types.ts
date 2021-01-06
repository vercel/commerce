// Core fetcher added by CommerceProvider
export type Fetcher<T> = (options: FetcherOptions) => T | Promise<T>

export type FetcherOptions = {
  url?: string
  query?: string
  method?: string
  variables?: any
  body?: any
}

export type HookFetcher<Result, Input = null> = (
  options: HookFetcherOptions | null,
  input: Input,
  fetch: <T = Result>(options: FetcherOptions) => Promise<T>
) => Result | Promise<Result>

export type HookFetcherOptions = {
  query?: string
  url?: string
  method?: string
}

export type HookInput = [string, string | number | boolean | undefined][]

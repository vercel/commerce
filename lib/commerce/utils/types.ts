// Core fetcher added by CommerceProvider
export type Fetcher<T> = (options: FetcherOptions) => T | Promise<T>

export type FetcherOptions = {
  url?: string
  query?: string
  method?: string
  variables?: any
  body?: any
}

export type HookFetcher<T, Input> = (
  options: HookFetcherOptions | null,
  input: Input,
  fetch: Fetcher<T>
) => T | Promise<T>

export type HookFetcherOptions = {
  query?: string
  url?: string
  method?: string
}

export type HookInput = [string, string | number | undefined][]

export type HookDeps = string | number | undefined[]

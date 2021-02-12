import type { HookFetcherFn } from './types'

const defaultFetcher: HookFetcherFn<any> = ({ options, fetch }) =>
  fetch(options)

export default defaultFetcher

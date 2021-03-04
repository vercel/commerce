import type { HookFetcherFn } from './types'

export const SWRFetcher: HookFetcherFn<any, any> = ({ options, fetch }) =>
  fetch(options)

export const mutationFetcher: HookFetcherFn<any, any> = ({
  input,
  options,
  fetch,
}) => fetch({ ...options, body: input })

export default SWRFetcher

import type { HookFetcherFn } from './types'

export const SWRFetcher: HookFetcherFn<any> = ({ options, fetch }) =>
  fetch(options)

export const mutationFetcher: HookFetcherFn<any> = ({
  input,
  options,
  fetch,
}) => fetch({ ...options, body: input })

export default SWRFetcher

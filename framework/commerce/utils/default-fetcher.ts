import type { HookFetcherFn } from './types'

const defaultFetcher: HookFetcherFn<any> = ({ options, fetch }) =>
  fetch(options)

export const mutationFetcher: HookFetcherFn<any> = ({
  input,
  options,
  fetch,
}) => fetch({ ...options, body: input })

export default defaultFetcher

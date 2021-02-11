import { HookFetcherFn } from './types'

const defaultFetcher: HookFetcherFn<any> = async ({
  options,
  fetch,
  normalize,
}) => {
  const data = await fetch({ ...options })
  return data && normalize ? normalize(data) : data
}

export default defaultFetcher

import { useCallback } from 'react'

type Options = {
  includeProducts?: boolean
}

export function emptyHook(options?: Options) {
  const useEmptyHook = async ({ id }: { id: string | number }) => {
    return useCallback(async function () {
      return Promise.resolve()
    }, [])
  }

  return useEmptyHook
}

export default emptyHook

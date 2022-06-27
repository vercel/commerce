export const withoutNils = <T>(xs: Array<T | undefined | null>): T[] =>
  xs.filter((x): x is T => x != null)

export const dedup = <T>(xs: Array<T>): T[] => [...new Set(xs)]

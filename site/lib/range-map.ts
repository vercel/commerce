export default function rangeMap<T>(n: number, fn: (i: number) => T): T[] {
  const arr: T[] = new Array(n)
  for (let i = 0; i < n; i++) {
    arr[i] = fn(i)
  }
  return arr
}

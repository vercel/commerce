export default function rangeMap(n: number, fn: (i: number) => any) {
  const arr = new Array(n)
  for (let i = 0; i < n; i++) {
    arr[i] = fn(i)
  }
  return arr
}

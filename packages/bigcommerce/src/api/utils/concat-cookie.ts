type Header = string | number | string[] | undefined | null

export default function concatHeader(prev: Header, val: Header) {
  if (!val) return prev
  if (!prev) return val

  if (Array.isArray(prev)) return prev.concat(String(val))

  prev = String(prev)

  if (Array.isArray(val)) return [prev].concat(val)

  return [prev, String(val)]
}
